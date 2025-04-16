import Link from 'next/link'

import { FC } from 'react'

import ItemData from '../ItemData'
import { ImgDummyCSR } from '../ImgDummy'
import { CombinedItemType } from '../../types/contentful.type'
import dataLayer from '../../utils/dataLayer'
import createCurrentItemInCartBlank from '../../utils/createCurrentItemInCartBlank'
import { parseItemHref } from '../../utils/parseHref'


export type ItemCardCSRProps = CombinedItemType


const ItemCardCSR: FC<ItemCardCSRProps> = (item) => {
  const itemInCart = createCurrentItemInCartBlank(item, 1)
  const { metaH1, name } = item

  return (
    <>
      <Link
        href={parseItemHref(item)}
        onClick={() => dataLayer({
          actionType: 'click',
          items: itemInCart ? [itemInCart] : []
        })}
        className='ItemCard'
      >
        <div className='ItemCard__Img-container'>
          <ImgDummyCSR
            img={item.images?.[0]}
            className='ItemCard__Img-container__Img'
          />
        </div>
        <ItemData {...item} />
      </Link>
      <Link
        href={parseItemHref(item)}
        className='d-none'
      >
        {metaH1 || name}
      </Link>
    </>
  )
}


export { ItemCardCSR }
