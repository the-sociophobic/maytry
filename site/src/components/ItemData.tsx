import { FC } from 'react'

import ColorSizes from './ColorSizes'
import parseColors from '../utils/parseColors'
import Price from './Price'
import { getInterval } from '../utils/price'
import { CombinedItemType } from '../types/contentful.type'


export type ItemDataProps = CombinedItemType


const ItemData: FC<ItemDataProps> = (item) => {
  const interval = getInterval(item)
  const {
    name,
    color_price_size,
  } = item
  const colors = parseColors(color_price_size)

  return (
    <div className='ItemData'>
      <div className='col-sm-9 col-md-4'>
        <div className='ItemData__price'>
          <div className='mb-2'>
            {name}
          </div>
          <Price
            className='mb-3'
            interval={interval}
          />
        </div>
      </div>
      <div className='col-sm-9 col-md-4'>
        {colors.map((colorSizes, index) =>
          <ColorSizes
            key={index}
            color={colorSizes.color}
            sizes={colorSizes.sizes.map(size => ({
              ...size.size,
              available: size.max_available > 0
            }))}
          />
        )}
      </div>
    </div>
  )
}



export default ItemData
