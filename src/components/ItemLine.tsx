import { FC } from 'react'

import LinkWrapper from './LinkWrapper'
import { ItemType } from '../hooks/useContentful/types'


export type ItemLineProps = ItemType


const ItemLine: FC<ItemLineProps> = (item) => {
  return (
    <LinkWrapper
      to={item.link}
      className='ItemLine'
    >
      <div className='ItemLine__name'>
        {item.name}
      </div>
      <div className='ItemLine__price'>
        {item.price} RUB
      </div>
    </LinkWrapper>
  )
}


export default ItemLine
