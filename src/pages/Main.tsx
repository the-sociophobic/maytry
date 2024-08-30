import { FC, useRef } from 'react'

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
  const { searchString } = useStore()
  const { filterBy } = useStore()
  const { showFilter } = useStore()
  const { showExtendedFilter } = useStore()
  const { sortOrder } = useStore()
  const { mainPageView } = useStore()
  const { showStartBanner } = useStore()
  const { priceFrom } = useStore()
  const { priceTo } = useStore()
  const { selectedColorIds } = useStore()
  const { selectedSizesIds } = useStore()
  const catalogRef = useRef<HTMLDivElement>(null)

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
                searchString.length === 0 ||
                  item.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
              )
              .filter(item =>
                (filterBy.length === 0 || !showFilter) ||
                  item.categories?.map(itemCategory => itemCategory.name)
                    .some(itemCategoryName => filterBy.includes(itemCategoryName))
              )
              .filter(item => {
                if (priceFrom === undefined)
                  return true
                return getCurrentPrice(item) >= priceFrom
              })
              .filter(item => {
                if (priceTo === undefined)
                  return true
                return getCurrentPrice(item) <= priceTo
              })
              .filter(item => {
                if (selectedColorIds.length === 0)
                  return true
                return item.color_price_size
                  ?.find(c_p_s =>
                    selectedColorIds.includes(c_p_s.color?.id || ''))
              })
              .filter(item => {
                if (selectedSizesIds.length === 0)
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
