import { FC } from 'react'

import LinkWrapper from '../components/LinkWrapper'
import ColorSizes from '../components/ColorSizes'
import { calculateItemsPrice, printPrice } from '../utils/price'
import Price from '../components/Price'
import QuantitySelector from '../components/QuantitySelector'
import ImgDummy from '../components/ImgDummy'
import useStore from '../hooks/useStore'
import { ItemInCartType } from '../types/site.type'
import dataLayer from '../utils/dataLayer'


export type UserOrderProps = {
  items: ItemInCartType[]
  totalPrice: number
  inCart?: boolean
}


const UserOrder: FC<UserOrderProps> = ({
  items,
  totalPrice,
  inCart
}) => {
  const { setItemInCart } = useStore()
  const itemsPrice = calculateItemsPrice(items)
  const promocodeAmount = itemsPrice - totalPrice

  return (
    <>
      <div className='Cart__header'>
        <div className='Cart__header__IMG'>
          ФОТО
        </div>
        <div className='Cart__header__DETAILS'>
          ИНФО
        </div>
        <div className='Cart__header__NAME'>
        </div>
        {/* <div className='Cart__header__REMOVE'>
        </div> */}
        <div className='Cart__header__PRICE'>
          ЦЕНА
        </div>
        <div className='Cart__header__SUBTOTAL'>
          ПОДИТОГ
        </div>
      </div>

      <div className='Cart__items'>
        {items.map(item =>
          <div
            key={item.id}
            className='Cart__items__item'
          >
            <div className='Cart__items__item__IMG'>
              <LinkWrapper
                to={'/item/' + item.link}
                className='d-block'
                onClick={() => dataLayer({
                  actionType: 'click',
                  items: [item]
                })}
              >
                <ImgDummy img={item.images?.[0]} />
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
                    {inCart ?
                      <QuantitySelector
                        value={item.quantity}
                        onChange={quantity => setItemInCart(item, quantity)}
                        max={item.max_available}
                      />
                      :
                      <div className='mx-3 no-select'>
                        {item.quantity}
                      </div>
                    }
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
              {item.quantity} × {printPrice(item.salePrice || item.price)} = {printPrice((item.salePrice || item.price) * item.quantity)}
            </div>
          </div>
        )}
      </div>

      {promocodeAmount > 0 &&
        <div className='d-flex flex-row justify-content-between pt-3'>
          <div className=''>
            СКИДКА ПО ПРОМОКОДУ
          </div>
          <div className=''>
            -{printPrice(promocodeAmount)}
          </div>
        </div>
      }
      <div className='d-flex flex-row justify-content-between py-3'>
        <div className=''>
          ИТОГО
        </div>
        <div className=''>
          {printPrice(totalPrice)}
        </div>
      </div>
    </>
  )
}


export default UserOrder
