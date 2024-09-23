import { FC } from 'react'

import { ItemType } from '../hooks/useContentful/types'
import ColorSizes from './ColorSizes'
import parseColors from '../utils/parseColors'
import Price from './Price'
import { getPrice, getSalePrice } from '../utils/price'


export type ItemDataProps = ItemType


const ItemData: FC<ItemDataProps> = (item) => {
  const price = getPrice(item) || 10000
  const salePrice = getSalePrice(item)
  const {
    name,
    color_price_size,
  } = item
  const colors = parseColors(color_price_size)

  return (
    <div className='ItemData'>
      <div className='col-sm-9 col-md-4'>
        <div className='ItemData__price'>
          <div className='mb-3'>
            {name}
          </div>
          <Price
            className='mb-3'
            price={price}
            salePrice={salePrice}
          />
        </div>
      </div>
      <div className='col-sm-9 col-md-4'>
        {colors.map((colorSizes, index) =>
          <ColorSizes
            key={index}
            color={colorSizes.color}
            sizes={colorSizes.sizes.map(size => size.size)}
          />
        )}
      </div>
    </div>
  )
}



export default ItemData
