'use client'
 
import { usePathname } from 'next/navigation'

import { FC, useEffect, useRef, useState } from 'react'

import { isMobile } from 'react-device-detect'

import useContentful from './lib/hooks/useContentful'
import ItemCard, { ItemCardEmpty } from './lib/components/ItemCard'
import useStore from './lib/hooks/useStore'
import ItemLine from './lib/components/ItemLine'
import { FiberScene } from './lib/components/Fiber/FiberScene'
import Button from './lib/components/Button'
import { ScrollToConsumer } from './lib/components/ScrollTo'
import { getCurrentPrice } from './lib/utils/price'
import sortMap from './lib/utils/sortMap'
import { CombinedItemType } from './lib/types/contentful.type'
import dataLayer from './lib/utils/dataLayer'
import createCurrentItemInCartBlank from './lib/utils/createCurrentItemInCartBlank'
import Breadcrumbs from './lib/components/Breadcrumbs'


export type MainProps = {
  categoryLink?: string
  searchParams?: {
    [key: string]: string | string[] | undefined;
  }
  h1?: string
}


const Main: FC<MainProps> = ({
  categoryLink,
  searchParams,
  h1
}) => {
  const { showStartBanner } = useStore()

  const { showSearch } = useStore()
  const { searchString } = useStore()
  const { setSearchString } = useStore()

  const { filterBy } = useStore()
  const { setFilterBy } = useStore()

  const { showExtendedFilter } = useStore()
  const { setShowExtendedFilter } = useStore()
  const { sortOrder } = useStore()
  const { mainPageView } = useStore()

  const { priceFrom } = useStore()
  const { setPriceFrom } = useStore()
  const { priceTo } = useStore()
  const { setPriceTo } = useStore()
  const { selectedColorIds } = useStore()
  const { setSelectedColorIds } = useStore()
  const { selectedSizesIds } = useStore()
  const { setSelectedSizesIds } = useStore()

  useEffect(() => {
    if (categoryLink) {
      // setShowExtendedFilter(true)
      setFilterBy([categoryLink])

      if (searchParams) {
        const searchParamsString = Object.entries(searchParams)
          .map(([key, value]) => `${key}=${value}`)
          .reduce((a, b) => a + b, '')

        setFilterBy([ categoryLink, searchParamsString ])
      }
    }
  }, [
    categoryLink,
    searchParams,
    setFilterBy,
    setShowExtendedFilter
  ])

  const catalogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showSearch)
      setSearchString('')
  }, [
    showSearch,
    setSearchString
  ])

  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/')
      setFilterBy([])
  }, [
    showExtendedFilter,
    setFilterBy
  ])

  const [sortNeverClicked, setSortNeverClicked] = useState(true)
  const [initialSortOrder] = useState(sortOrder)
  useEffect(() => {
    if (sortNeverClicked && sortOrder !== initialSortOrder)
      setSortNeverClicked(false)
  }, [
    sortNeverClicked,
    sortOrder,
    initialSortOrder,
    setSortNeverClicked
  ])

  const use_extendedFilter = showExtendedFilter || isMobile

  useEffect(() => {
    if (!use_extendedFilter) {
      setPriceFrom(undefined)
      setPriceTo(undefined)
      setSelectedColorIds([])
      setSelectedSizesIds([])
    }
  }, [
    use_extendedFilter,
    setPriceFrom,
    setPriceTo,
    setSelectedColorIds,
    setSelectedSizesIds
  ])

  const { data: contentful } = useContentful()
  const orderSortFn = sortMap(contentful?.sites?.[0]?.main_page_items || [])
  const priceSortFn = (a: CombinedItemType, b: CombinedItemType) =>
    sortOrder === 'asc' ?
      getCurrentPrice(a) - getCurrentPrice(b)
      :
      getCurrentPrice(b) - getCurrentPrice(a)

  const filteredItems = (contentful?.items || [])
    // Строка поиска
    .filter(item =>
      searchString.length === 0 ||
      item.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
    )
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
    // Минимальная цена
    .filter(item => {
      if (!use_extendedFilter || priceFrom === undefined)
        return true
      return getCurrentPrice(item) >= priceFrom
    })
    // Максимальная цена
    .filter(item => {
      if (!use_extendedFilter || priceTo === undefined)
        return true
      return getCurrentPrice(item) <= priceTo
    })
    // Цвет
    .filter(item => {
      if (!use_extendedFilter || selectedColorIds.length === 0)
        return true
      return item.color_price_size
        ?.find(c_p_s =>
          selectedColorIds.includes(c_p_s.color?.id || ''))
    })
    // Размер
    .filter(item => {
      if (!use_extendedFilter || selectedSizesIds.length === 0)
        return true
      return item.color_price_size
        ?.find(c_p_s =>
          selectedSizesIds.includes(c_p_s.size?.id || ''))
    })
    .sort(use_extendedFilter && !sortNeverClicked ?
      priceSortFn
      :
      orderSortFn
    )
  
  const itemInCart = filteredItems[0] ? createCurrentItemInCartBlank(filteredItems[0], 1) : undefined

  useEffect(() => {
    dataLayer({
      actionType: 'impressions',
      items: itemInCart ? [itemInCart] : []
    })
  }, [])

  const numberOfEmptyCards = 6 - (filteredItems.length % 6)
  const emptyCardsArray = Array(numberOfEmptyCards).fill(0)

  return (
    <ScrollToConsumer>
      {({ scrollTo, contentRef }) =>
        <div className='container-2'>
          <Breadcrumbs />
          <h1 className='d-none'>{h1}</h1>
          {(showStartBanner && contentRef) &&
            <FiberScene
              contentRef={contentRef}
              catalogRef={catalogRef}
            >
              <Button
                transparent
                medium
                className='flicker'
                onClick={() => {
                  scrollTo(catalogRef.current?.offsetTop || 0)
                }}
              >
                Начать
              </Button>
            </FiberScene>
          }
          <div
            ref={catalogRef}
            className={`
              d-flex
              flex-${mainPageView === 'IMG' ? 'row' : 'column'}
              flex-wrap
              justify-content-between
            `}
          >
            {filteredItems
              .map((item, itemIndex) =>
                mainPageView === 'IMG' ?
                  <ItemCard
                    key={item.oneC_item?.barcode || itemIndex}
                    {...item}
                  />
                  :
                  <ItemLine
                    key={item.id}
                    {...item}
                  />
              )
            }
            {emptyCardsArray.map((emptyCard, emptyCardIndex) =>
              <ItemCardEmpty key={emptyCardIndex} />
            )}
          </div>
        </div>
      }
    </ScrollToConsumer>
  )
}


export default Main
