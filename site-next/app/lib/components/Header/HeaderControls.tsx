import useContentful from '../../hooks/useContentful'
import useStore from '../../hooks/useStore'
import Button from '../Button'
import Input from '../Input'


const HeaderControls = () => {
  // const { mainPageView } = useStore()
  // const { setMainPageView } = useStore()
  const { showSearch } = useStore()
  const { setShowSearch } = useStore()
  const { searchString } = useStore()
  const { setSearchString } = useStore()
  const { showFilter } = useStore()
  const { setShowFilter } = useStore()
  const { filterBy } = useStore()
  const { setFilterBy } = useStore()
  const { showExtendedFilter } = useStore()
  const { setShowExtendedFilter } = useStore()
  const { setShowAccount } = useStore()
  const { setPriceFrom } = useStore()
  const { setPriceTo } = useStore()

  const { data: contentful } = useContentful()
  const header_filter_categories = contentful?.sites[0]?.header_filter_categories || []

  return (
    <div className='d-flex'>
      <div className='Header__section'>
        <Button onClick={() => {
          if (!showFilter) {
            setShowAccount(false)
            setShowSearch(false)
          }
          setShowExtendedFilter(false)
          setShowFilter(!showFilter)
        }}>
          ФИЛЬТР
        </Button>
      </div>
      {!showFilter ?
        <>
          {/* <div className='Header__section d-flex'>
            <Button
              hoverable
              gray={mainPageView === 'IMG'}
              onClick={() => setMainPageView('IMG')}
            >
              IMG
            </Button>
            <Button
              hoverable
              gray={mainPageView === 'TXT'}
              onClick={() => setMainPageView('TXT')}
            >
              TXT
            </Button>
          </div> */}
          {showSearch ?
            <>
              <Input
                className='Header__section'
                value={searchString}
                onChange={setSearchString}
              />
              <Button onClick={() => setShowSearch(false)}>
                ЗАКРЫТЬ
              </Button>
            </>
            :
            <Button onClick={() => {
              setShowSearch(true)
              setShowAccount(false)
              setShowFilter(false)
            }}>
              ПОИСК
            </Button>
          }
        </>
        :
        <>
          {header_filter_categories
            .map((category, index) =>
              <Button
                key={index}
                hoverable
                gray={filterBy.includes(category.name) && !showExtendedFilter}
                onClick={() => {
                  setFilterBy([category.name])
                  setShowExtendedFilter(false)
                }}
              >
                {category.name}
              </Button>
            )
          }
          <Button
            hoverable
            gray={showExtendedFilter}
            onClick={() => {
              setFilterBy([])
              setShowExtendedFilter(true)
            }}
          >
            Расширенный фильтр
          </Button>
          <Button
            onClick={() => {
              setShowFilter(false)
              setShowExtendedFilter(false)
              setPriceFrom(undefined)
              setPriceTo(undefined)
            }}
            className='ms-5'
          >
            ЗАКРЫТЬ
          </Button>
        </>
      }

    </div>
  )
}


export default HeaderControls
