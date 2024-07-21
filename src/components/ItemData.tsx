import { FC } from 'react'

import { ItemType } from '../hooks/useContentful/types'


export type ItemDataProps = ItemType


const ItemData: FC<ItemDataProps> = ({
  price,
  name,
  available_sizes
}) =>
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
        {available_sizes.map(size =>
          <div className='me-3'>
            {size.name}
          </div>
        )}
      </div>
    </div>
  </div>



export default ItemData
