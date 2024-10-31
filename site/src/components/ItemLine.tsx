import { FC } from 'react'

import LinkWrapper from './LinkWrapper'
import { CombinedItemType } from '../types/contentful.type'


export type ItemLineProps = CombinedItemType


const ItemLine: FC<ItemLineProps> = (item) => {
  const price = item.defaultPrice || item.color_price_size?.[0].price || 10000

  return (
    <LinkWrapper
      to={'/item/' + item.link}
      className='ItemLine'
    >
      <div className='ItemLine__name'>
        {item.name}
      </div>
      <div className='ItemLine__price'>
        {price} RUB
      </div>
    </LinkWrapper>
  )
}


export default ItemLine
