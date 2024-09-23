import { FC } from 'react'

import { ItemType } from '../hooks/useContentful/types'
import LinkWrapper from './LinkWrapper'
import Img from './Img'
import useStore from '../hooks/useStore'
import ItemData from './ItemData'


export type ItemCardProps = ItemType


const ItemCard: FC<ItemCardProps> = (item) => {
  const { setHoveredItem } = useStore()

  return (
    <LinkWrapper
      to={item.link}
      className='ItemCard'
      onMouseOver={() => setHoveredItem(item)}
      onMouseLeave={() => setHoveredItem(undefined)}
    >
      {item.images[0] &&
        <Img
          file={item.images[0].small}
          className='w-100'
        />
      }
      {/* <div className='ItemCard__name'>
        {item.name}
      </div> */}
      <ItemData {...item} />
    </LinkWrapper>
  )
}


export default ItemCard
