'use server'

import { FC } from 'react'

import { ItemCardSSR, ItemCardEmpty } from './lib/components/ItemCard'
import { BreadcrumbsSSR } from './lib/components/Breadcrumbs'
import { FooterSSR } from './lib/components/Footer'
import contentful from '@/app/lib/utils/preloaded/contentful'
import Loader from './lib/components/Loader'


export type MainSSRProps = {
  categoryLink?: string
  searchParams?: {
    [key: string]: string | string[] | undefined;
  }
  h1?: string
}


const MainSSR: FC<MainSSRProps> = async ({
  categoryLink,
  searchParams,
  h1
}) => {
  let filterBy: string[] = []

  if (categoryLink) {
    filterBy = [categoryLink]

    if (searchParams) {
      const searchParamsString = Object.entries(searchParams)
        .map(([key, value]) => `${key}=${value}`)
        .reduce((a, b) => a + b, '')

      filterBy = [categoryLink, searchParamsString]
    }
  }

  const filteredItems = (contentful?.items || [])
    // Категории
    .filter(item => {
      if (filterBy.length === 0)
        return true

      const categoryMatch = filterBy[0] ?
        item.categories.find(category => category.link === filterBy[0])
        :
        true
      const subategoryMatch = filterBy[1] ?
        item.categories.find(category => category.link === filterBy[1])
        :
        true

      return categoryMatch && subategoryMatch
    })

  const numberOfEmptyCards = (6 - (filteredItems.length % 6)) % 6
  const emptyCardsArray = Array(numberOfEmptyCards).fill(0)


  return (
    <div className='server-only'>
      <Loader className='desktop-only' />
      <div className='container-2'>
        <BreadcrumbsSSR pathname={`/categoriya/${categoryLink}/`} />
        <h1 className='d-none'>{h1}</h1>
        <div
          className={`
              d-flex
              flex-row
              flex-wrap
              justify-content-between
            `}
        >
          {filteredItems
            .map((item, itemIndex) =>
              <ItemCardSSR
                key={itemIndex}
                {...item}
              />
            )
          }
          {emptyCardsArray.map((_emptyCard, emptyCardIndex) =>
            <ItemCardEmpty key={emptyCardIndex} />
          )}
        </div>
      </div>
      <FooterSSR />
    </div>
  )
}


export default MainSSR
