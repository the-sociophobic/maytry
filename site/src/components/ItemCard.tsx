import { FC } from 'react'

import LinkWrapper from './LinkWrapper'
import useStore from '../hooks/useStore'
import ItemData from './ItemData'
import ImgDummy from './ImgDummy'
import { CombinedItemType } from '../types/contentful.type'
import dataLayer from '../utils/dataLayer'
import createCurrentItemInCartBlank from '../utils/createCurrentItemInCartBlank'


export type ItemCardProps = CombinedItemType


const ItemCard: FC<ItemCardProps> = (item) => {
  const { setHoveredItem } = useStore()
  const itemInCart = createCurrentItemInCartBlank(item, 1)

  return (
    <LinkWrapper
      to={'/item/' + item.link}
      onClick={() => dataLayer({
        actionType: 'click',
        items: itemInCart ? [itemInCart] : []
      })}
      className='ItemCard'
      onMouseOver={() => setHoveredItem(item)}
      onMouseLeave={() => setHoveredItem(undefined)}
    >
      <ImgDummy
        img={item.images?.[0]}
        className='w-100'
      />
      {/* <div className='ItemCard__name'>
        {item.name}
      </div> */}
      <ItemData {...item} />
    </LinkWrapper>
  )
}


export default ItemCard
