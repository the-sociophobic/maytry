import { FC, useEffect, useState } from 'react'

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
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return window.removeEventListener('resize', handleResize)
  })

  return (
    <LinkWrapper
      to={'/product/' + item.link}
      onClick={() => dataLayer({
        actionType: 'click',
        items: itemInCart ? [itemInCart] : []
      })}
      className='ItemCard'
      onMouseOver={() => setHoveredItem(item)}
      onMouseLeave={() => setHoveredItem(undefined)}
    >
      <div className='ItemCard__Img-container'>
        <ImgDummy
          img={item.images?.[0]}
          className='ItemCard__Img-container__Img'
        // width={100}
        // height={100}
        />
      </div>
      {/* <div className='ItemCard__name'>
        {item.name}
      </div> */}
      <ItemData {...item} />
    </LinkWrapper>
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
