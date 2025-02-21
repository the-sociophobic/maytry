import { FC } from 'react'

import useStore from '../hooks/useStore'
import LinkWrapper from '../components/LinkWrapper'
import Button from '../components/Button'
import useTotalPrice from '../hooks/useTotalPrice'
import yandexGoal from '../utils/yandex/goal'
import { YANDEX_GOAL } from '../utils/yandex/consts'
import useSyncCart from '../hooks/useSyncCart'
import UserOrder from '../components/UserOrder'


const Cart: FC = () => {
  const { itemsInCart } = useStore()
  const totalPrice = useTotalPrice()

  const syncCart = useSyncCart()
  syncCart()

  return (
    <div className='Cart'>
      <div className='container-2'>
        <div className='row'>
          <div className='col col-xl-6'>
            <h3 className='h3 mb-5'>
              Корзина
            </h3>

            {itemsInCart.length === 0 ? 'Пусто' :
              <>
                <UserOrder
                  items={itemsInCart}
                  totalPrice={totalPrice}
                  inCart
                />

                <div className='d-flex flex-row justify-content-between py-3'>
                  <LinkWrapper
                    to='/checkout'
                    onClick={() => yandexGoal({ goalId: YANDEX_GOAL.STARTED_FILLING_ITEM })}
                  // className='d-inline-block'
                  >
                    <Button black>
                      ЗАКАЗАТЬ
                    </Button>
                  </LinkWrapper>
                </div>

              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}


export default Cart
