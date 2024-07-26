import { FC } from 'react'

import { ItemType } from '../hooks/useContentful/types'
import ColorSizes from './ColorSizes'
import printPrice from '../utils/printPrice'
import parseColors from '../utils/parseColors'
import Price from './Price'

export type ItemDataProps = ItemType


const ItemData: FC<ItemDataProps> = ({
  name,
  color_price_size,
  defaultPrice,
  defaultSalePrice
}) => {
  const price = defaultPrice || color_price_size?.[0].price || 10000
  const salePrice = defaultSalePrice || color_price_size?.[0].salePrice || 10000
  const colors = parseColors(color_price_size)

  return (
    <div className='ItemData'>
      <div className='d-flex flex-column'>
        <div className='ItemData__price'>
          <Price
            price={price}
            salePrice={salePrice}
          />
        </div>
      </div>
      <div className='d-flex flex-column'>
        <div className='mb-3'>
          {name}
        </div>
        {colors.map(colorSizes =>
          <ColorSizes
            color={colorSizes.color}
            sizes={colorSizes.sizes.map(size => size.size)}
          />
        )}
      </div>
    </div>
  )
}



export default ItemData
