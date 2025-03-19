import useContentful from '../../hooks/useContentful'
import useStore from '../../hooks/useStore'
import { toggleInSet } from '../../utils/sets'
import Button from '../Button'
import Input from '../Input'
import SizeSelector from '../SizeSelector'


const ExtendedFilter = () => {
  const { data: contentful } = useContentful()
  const { filterBy } = useStore()
  const { setFilterBy } = useStore()
  const { priceFrom } = useStore()
  const { setPriceFrom } = useStore()
  const { priceTo } = useStore()
  const { setPriceTo } = useStore()
  const { sortOrder } = useStore()
  const { setSortOrder } = useStore()
  // const { selectedColorIds } = useStore()
  // const { setSelectedColorIds } = useStore()
  const { selectedSizesIds } = useStore()
  const { setSelectedSizesIds } = useStore()

  return (
    <div className='Header__extended-filter'>
      <div className='d-flex flex-column'>
        <p className='m-0 mt-3'>Категории:</p>
        <div className='d-flex flex-row align-items-center my-3 flex-wrap'>
          {contentful?.sites[0]?.extended_filter_categories
            .map((category, index) =>
              <Button
                key={index}
                hoverable
                gray={filterBy.includes(category.name)}
                className='me-2 mb-2'
                onClick={() => {
                  setFilterBy(toggleInSet(filterBy, category.name))
                }}
              >
                {category.name}
              </Button>
            )
          }
        </div>
        <div className='d-flex flex-row my-3'>
          <p className='m-0'>Цена:</p>
          <Input
            className='Header__section ms-3'
            type={'number'}
            value={priceFrom === undefined ? '' : priceFrom}
            onChange={value => setPriceFrom(parseInt(value) || undefined)}
            placeholder='от'
          />
          <Input
            className='Header__section ms-3'
            type={'number'}
            value={priceTo === undefined ? '' : priceTo}
            onChange={value => setPriceTo(parseInt(value) || undefined)}
            placeholder='до'
          />
        </div>
        <div className='d-flex flex-row my-3'>
          <p className='m-0'>Сортировка по:</p>
          <p
            className='m-0 ms-3 cursor-pointer no-select'
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            Цене {sortOrder === 'asc' ? '↑' : '↓'}
          </p>
        </div>
        {/* <ColorSelector
          colors={contentful?.colors || []}
          selectedColorIds={selectedColorIds}
          onChange={setSelectedColorIds}
          className='my-3'
        /> */}
        <SizeSelector
          sizes={(contentful?.sizes || []).map(size => ({
            ...size,
            available: true
          }))}
          selectedIds={selectedSizesIds}
          onChange={size => setSelectedSizesIds(toggleInSet(selectedSizesIds, size))}
          className='my-3'
        />
      </div>
    </div>
  )
}


export default ExtendedFilter
