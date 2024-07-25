import { FC } from 'react'

import { ItemType } from '../hooks/useContentful/types'


export type ItemDataProps = ItemType


const ItemData: FC<ItemDataProps> = ({
  name,
  color_price_size,
  defaultPrice
}) => {
  const price = defaultPrice || color_price_size?.[0].price || 10000

  return (
    <div className='d-flex flex-row my-3 justify-content-between'>
      <div className='d-flex flex-column'>
        <div className=''>
          {price} RUB
        </div>
      </div>
      <div className='d-flex flex-column'>
        <div className='mb-3'>
          {name}
        </div>
        <div className='d-flex flex-row'>
          {color_price_size?.map(c_p_s =>
            <div className='me-3'>
              {c_p_s.size.name}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



export default ItemData
