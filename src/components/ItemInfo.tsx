import { FC, useEffect, useState } from 'react'
import { pick } from 'lodash'
import { useNavigate } from 'react-router-dom'

import useStore from '../hooks/useStore'
import Color from './Color'
import Price from './Price'
import Button from './Button'
import SizeSelector from './SizeSelector'
import QuantitySelector from './QuantitySelector'
import { ItemInCartType } from '../pages/Cart'
import { ItemType } from '../hooks/useContentful/types'
import parseColors from '../utils/parseColors'


export type ItemInfoProps = ItemType


const ItemInfo: FC<ItemInfoProps> = (item) => {
  const colors = parseColors(item.color_price_size)

  const defaultColor = colors.find(color => color.sizes.some(size => size.max_available > 0))
  const [currentColor, setCurrentColor] = useState(defaultColor)

  const currentSizes = currentColor?.sizes || []
  const defaultSize = currentSizes.find(size => size.max_available > 0)
  const [currentSize, setCurrentSize] = useState(defaultSize)

  useEffect(() => {
    setCurrentSize(defaultSize)
  }, [currentColor])

  const { itemsInCart } = useStore()
  const currentItemInCartBlank: ItemInCartType = {
    ...item,
    ...(currentSize || {
      size: { id: '', name: '' },
      price: 0,
      max_available: 0
    }),
    color: currentColor?.color,
    quantity: 0,
    id: currentSize ? currentSize.id : ''
  }
  const currentItemInCart = itemsInCart
    .find(itemInCart => itemInCart.id === currentSize?.id)
    || currentItemInCartBlank
  const { setItemInCart } = useStore()

  const navigate = useNavigate()

  return (
    <div className='col-3'>
      <div className='position-sticky pe-4' style={{ top: '100px' }}>
        <h3 className='h3 mb-5'>
          {item.name}
        </h3>
        <div className='mb-4'>

          <div className='d-flex flex-column mb-4'>
            {colors
              .map((colorSizes, colorSizesIndex) => {
                const is_color_available = colorSizes?.sizes
                  .map(colorSize => colorSize.max_available > 0)
                  .reduce((a, b) => a || b)

                return (
                  <div
                    key={colorSizesIndex}
                    className={`
                      d-flex flex-row mb-2 cursor-pointer
                      ${!is_color_available && 'text-disabled'}
                    `}
                    onClick={() => is_color_available && setCurrentColor(colorSizes)}
                  >
                    <Color
                      {...colorSizes.color!}
                      className='me-3'
                      selected={currentColor?.color?.id === colorSizes.color?.id}
                    />
                    {colorSizes.color?.name}
                  </div>
                )
              })
            }
          </div>

          <SizeSelector
            sizes={currentSizes.map(size => ({
              ...size.size,
              available: size.max_available > 0
            }))}
            selectedIds={[currentSize?.size.id || '']}
            onChange={sizeId => setCurrentSize(currentSizes.find(size => size.size.id === sizeId))}
          />

          <div className='d-flex flex-row mt-3 mb-4'>
            <div className='me-3'>
              Цена:
            </div>
            <Price {...(currentSize ?
              pick(currentSize, 'price', 'salePrice')
              :
              {
                price: item.defaultPrice || 0,
                salePrice: item.defaultSalePrice,
              }
            )} />
          </div>

          {currentItemInCart.quantity > 0 ?
            <QuantitySelector
              value={currentItemInCart.quantity}
              onChange={quantity => setItemInCart(currentItemInCart, quantity)}
              max={currentItemInCart.max_available}
            />
            :
            currentSize && currentSize?.max_available > 0 ?
              <Button
                black
                className={``}
                onClick={() => {
                  setItemInCart(currentItemInCart, 1)
                  navigate('/cart')
                }}
              >
                В КОРЗИНУ
              </Button>
              :
              ''
          }

        </div>

        <div className='ItemPage__description'>
          {item.description}
        </div>

      </div>
    </div>
  )
}


export default ItemInfo
