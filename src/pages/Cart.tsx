import { FC } from 'react'

import { ColorPriceSizeType, ItemType } from '../hooks/useContentful/types'
import useStore from '../hooks/useStore'
import Img from '../components/Img'
import Button from '../components/Button'
import ColorSizes from '../components/ColorSizes'
import { printPrice } from '../utils/price'
import Price from '../components/Price'
import LinkWrapper from '../components/LinkWrapper'
import QuantitySelector from '../components/QuantitySelector'


export type CartProps = {}

export type ItemInCartType = Omit<ItemType,
  | 'color_price_size'
  | 'defaultPrice'
  | 'defaultSalePrice'
> & ColorPriceSizeType & {
  quantity: number
}



const Cart: FC<CartProps> = ({ }) => {
  const { itemsInCart } = useStore()
  const { setItemInCart } = useStore()
  const totalPrice = itemsInCart
    .map(item => (item.salePrice || item.price) * item.quantity)
    .reduce((a, b) => a + b, 0)

  return (
    <div className='Cart'>
      <div className='container-2'>
        <div className='row'>
          <h3 className='h3 mb-5'>
            Корзина
          </h3>

          {itemsInCart.length === 0 ? 'Пусто' :
            <>
              <div className='Cart__header'>
                <div className='Cart__header__IMG'>
                  IMG
                </div>
                <div className='Cart__header__DETAILS'>
                  DETAILS
                </div>
                <div className='Cart__header__NAME'>
                </div>
                {/* <div className='Cart__header__REMOVE'>
                </div> */}
                <div className='Cart__header__PRICE'>
                  PRICE
                </div>
                <div className='Cart__header__SUBTOTAL'>
                  SUBTOTAL
                </div>
              </div>

              <div className='Cart__items'>
                {itemsInCart.map(item =>
                  <div
                    key={item.id}
                    className='Cart__items__item'
                  >
                    <div className='Cart__items__item__IMG'>
                      <LinkWrapper
                        to={'/' + item.link}
                        className='w-50 d-block'
                      >
                        <Img
                          file={item.images[0].small}
                        />
                      </LinkWrapper>
                    </div>
                    <div className='Cart__items__item__NAME-DETAILS-PRICE'>
                      <div className='Cart__items__item__NAME-DETAILS'>
                        <div className='d-flex flex-row mb-2'>
                          <div className='Cart__items__item__DETAILS'>
                            ИМЯ
                          </div>
                          <div className='Cart__items__item__NAME'>
                            {item.name}
                          </div>
                          {/* <div className='Cart__items__item__REMOVE'>
                            <Button onClick={() => setItemInCart(item, 0)}>
                              УДАЛИТЬ
                            </Button>
                          </div> */}
                        </div>
                        <div className='d-flex flex-row mb-2'>
                          <div className='Cart__items__item__DETAILS'>
                            ЦВЕТ И РАЗМЕР
                          </div>
                          <div className='Cart__items__item__NAME'>
                            <ColorSizes
                              color={item.color}
                              sizes={[item.size]}
                            />
                          </div>
                        </div>
                        <div className='d-flex flex-row mb-2'>
                          <div className='Cart__items__item__DETAILS'>
                            КОЛИЧЕСТВО
                          </div>
                          <div className='Cart__items__item__NAME'>
                            <QuantitySelector
                              value={item.quantity}
                              onChange={quantity => setItemInCart(item, quantity)}
                              max={item.max_available}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='Cart__items__item__PRICE'>
                        <Price
                          price={item.price}
                          salePrice={item.salePrice}
                        />
                      </div>
                    </div>
                    <div className='Cart__items__item__SUBTOTAL'>
                      {printPrice((item.salePrice || item.price) * item.quantity)}
                    </div>
                  </div>
                )}
              </div>

              <div className='d-flex flex-row justify-content-between py-3'>
                <div className=''>
                  TOTAL
                </div>
                <div className=''>
                  {printPrice(totalPrice)}
                </div>
              </div>

              <div className='d-flex flex-row justify-content-between py-3'>
                <Button black>
                  ЗАКАЗАТЬ
                </Button>
              </div>
            </>
          }

        </div>
      </div>
    </div>
  )
}


export default Cart
