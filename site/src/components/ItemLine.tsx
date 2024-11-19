import { FC } from 'react'

import LinkWrapper from './LinkWrapper'
import { CombinedItemType } from '../types/contentful.type'
import { getPrice } from '../utils/price'


export type ItemLineProps = CombinedItemType


const ItemLine: FC<ItemLineProps> = (item) => {
  const price = getPrice(item)

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
