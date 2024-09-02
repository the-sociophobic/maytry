import { FC, useEffect, useRef } from 'react'

import useContentful from '../hooks/useContentful'
import ItemCard from '../components/ItemCard'
import useStore from '../hooks/useStore'
import ItemLine from '../components/ItemLine'
import { FiberScene } from '../components/Fiber/FiberScene'
import Button from '../components/Button'
import { ScrollToConsumer } from '../App'
import { getCurrentPrice } from '../utils/price'


export type MainProps = {}


const Main: FC<MainProps> = ({ }) => {
  const { data: contentful } = useContentful()

  const { showStartBanner } = useStore()

  const { showSearch } = useStore()
  const { searchString } = useStore()
  const { setSearchString } = useStore()

  const { showFilter } = useStore()
  const { filterBy } = useStore()
  const { setFilterBy } = useStore()

  const { showExtendedFilter } = useStore()
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

  const catalogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showSearch)
      setSearchString('')
  }, [showSearch])

  useEffect(() => {
    if (!showFilter)
      setFilterBy([])
  }, [showFilter])

  useEffect(() => {
    if (!showExtendedFilter) {
      setPriceFrom(undefined)
      setPriceTo(undefined)
      setSelectedColorIds([])
      setSelectedSizesIds([])
    }
  }, [showExtendedFilter])

  return (
    <ScrollToConsumer>
      {({ scrollTo }) =>
        <div className='container-2'>
          {showStartBanner &&
            <FiberScene>
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
            {contentful?.items
              .filter(item =>
                !showSearch || searchString.length === 0 ||
                item.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
              )
              .filter(item =>
                (!showFilter || filterBy.length === 0) ||
                item.categories?.map(itemCategory => itemCategory.name)
                  .some(itemCategoryName => filterBy.includes(itemCategoryName))
              )
              .filter(item => {
                if (!showExtendedFilter || priceFrom === undefined)
                  return true
                return getCurrentPrice(item) >= priceFrom
              })
              .filter(item => {
                if (!showExtendedFilter || priceTo === undefined)
                  return true
                return getCurrentPrice(item) <= priceTo
              })
              .filter(item => {
                if (!showExtendedFilter || selectedColorIds.length === 0)
                  return true
                return item.color_price_size
                  ?.find(c_p_s =>
                    selectedColorIds.includes(c_p_s.color?.id || ''))
              })
              .filter(item => {
                if (!showExtendedFilter || selectedSizesIds.length === 0)
                  return true
                return item.color_price_size
                  ?.find(c_p_s =>
                    selectedSizesIds.includes(c_p_s.size?.id || ''))
              })
              .sort((a, b) => {
                if (!showExtendedFilter)
                  return 0
                return sortOrder === 'asc' ?
                  getCurrentPrice(a) - getCurrentPrice(b)
                  :
                  getCurrentPrice(b) - getCurrentPrice(a)
              })
              .map(item =>
                mainPageView === 'IMG' ?
                  <ItemCard
                    key={item.id}
                    {...item}
                  />
                  :
                  <ItemLine
                    key={item.id}
                    {...item}
                  />
              )
            }
          </div>
        </div>
      }
    </ScrollToConsumer>
  )
}


export default Main