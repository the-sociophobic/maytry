import { FC } from 'react'

import ItemData from './ItemData'
import ImgDummy from './ImgDummy'
import { CombinedItemType } from '../types/contentful.type'
import dataLayer from '../utils/dataLayer'
import createCurrentItemInCartBlank from '../utils/createCurrentItemInCartBlank'
import Link from 'next/link'
import { parseItemHref } from '../utils/parseHref'


export type ItemCardProps = CombinedItemType


const ItemCard: FC<ItemCardProps> = (item) => {
  // const { setHoveredItem } = useStore()
  const itemInCart = createCurrentItemInCartBlank(item, 1)

  return (
    <Link
      href={parseItemHref(item)}
      onClick={() => dataLayer({
        actionType: 'click',
        items: itemInCart ? [itemInCart] : []
      })}
      className='ItemCard'
      // onMouseOver={() => setHoveredItem(item)}
      // onMouseLeave={() => setHoveredItem(undefined)}
    >
      <div className='ItemCard__Img-container'>
        <ImgDummy
          img={item.images?.[0]}
          className='ItemCard__Img-container__Img'
        />
      </div>
      <ItemData {...item} />
    </Link>
  )
}


export default ItemCard


export const ItemCardEmpty: FC = () => {
  return (
    <div className='ItemCard'>
      <div className='ItemCard__Img-container'>
      </div>
    </div>
  )
}
