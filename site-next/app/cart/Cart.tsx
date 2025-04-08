'use client'

import { FC, useEffect } from 'react'

import useStore from '../lib/hooks/useStore'
import LinkWrapper from '../lib/components/LinkWrapper'
import Button from '../lib/components/Button'
import useTotalPrice from '../lib/hooks/useTotalPrice'
import yandexGoal from '../lib/utils/yandex/goal'
import { YANDEX_GOAL } from '../lib/utils/yandex/consts'
import useSyncCart from '../lib/hooks/useSyncCart'
import UserOrder from '../lib/components/UserOrder'


export type CartProps = {
  h1?: string
}


const Cart: FC<CartProps> = ({
  h1
}) => {
  const { itemsInCart } = useStore()
  const totalPrice = useTotalPrice()

  const syncCart = useSyncCart()
  syncCart()

  useEffect(() => {
    if (itemsInCart.length > 0)
      yandexGoal({ goalId: YANDEX_GOAL.STARTED_FILLING_ITEM })
  }, [itemsInCart])

  return (
    <div className='Cart'>
      <div className='container-2'>
        <div className='row'>
          <div className='col col-xl-6'>
            <h1 className='h3 mb-5'>
              {h1 || 'Корзина'}
            </h1>

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
                    onClick={() => {
                      yandexGoal({ goalId: YANDEX_GOAL.ORDER })
                    }}
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
