import { FC, useEffect } from 'react'

import ItemData from './ItemData'
import ImgDummy from './ImgDummy'
import { CombinedItemType } from '../types/contentful.type'
import dataLayer from '../utils/dataLayer'
import createCurrentItemInCartBlank from '../utils/createCurrentItemInCartBlank'
import Link from 'next/link'


export type ItemCardProps = CombinedItemType


const ItemCard: FC<ItemCardProps> = (item) => {
  // const { setHoveredItem } = useStore()
  const itemInCart = createCurrentItemInCartBlank(item, 1)

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return window.removeEventListener('resize', handleResize)
  })

  return (
    <Link
      href={`/product/${item.link}/`}
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
