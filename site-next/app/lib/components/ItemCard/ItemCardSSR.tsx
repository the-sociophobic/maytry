'use server'

import Link from 'next/link'

import { FC } from 'react'

import ItemData from '../ItemData'
import { ImgDummySSR } from '../ImgDummy'
import { CombinedItemType } from '../../types/contentful.type'
import { parseItemHref } from '../../utils/parseHref'


export type ItemCardSSRProps = CombinedItemType


const ItemCardSSR: FC<ItemCardSSRProps> = (item) => {
  const { metaH1, name } = item

  return (
    <>
      <Link
        href={parseItemHref(item)}
        className='ItemCard'
      >
        <div className='ItemCard__Img-container'>
          <ImgDummySSR
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


export { ItemCardSSR }
