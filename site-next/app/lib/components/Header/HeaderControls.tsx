import Link from 'next/link'

import useContentful from '../../hooks/useContentful'
import useStore from '../../hooks/useStore'
import Button from '../Button'
import Input from '../Input'
import LinkWrapper from '../LinkWrapper'


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
  // const header_filter_categories = contentful?.sites[0]?.header_filter_categories || []
  const header_filter_categories = contentful?.categorys.filter(category => category.link) || []

  return (
    <div className='d-flex'>
      <div className='Header__section'>
        <Link href={'/'}>
          <Button onClick={() => {
            // if (!showFilter) {
            //   setShowAccount(false)
            //   setShowSearch(false)
            // }
            // setShowExtendedFilter(false)
            // setShowFilter(!showFilter)
            if (!showExtendedFilter) {
              setShowAccount(false)
              setShowSearch(false)
            }
            // setShowExtendedFilter(false)
            setShowExtendedFilter(!showExtendedFilter)
          }}>
            ФИЛЬТР
          </Button>
        </Link>
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
          {/* {header_filter_categories
            .map((category, index) =>
              <Link
                key={index}
                href={category.link || '/'}
              >
                <Button
                  hoverable
                  gray={filterBy.includes(category.name) && !showExtendedFilter}
                  onClick={() => {
                    // setFilterBy([category.link || category.name])
                    setShowExtendedFilter(false)
                  }}
                >
                  {category.name}
                </Button>
              </Link>
            )
          } */}
          {/* <Button
            hoverable
            gray={showExtendedFilter}
            onClick={() => {
              setFilterBy([])
              setShowExtendedFilter(true)
            }}
          >
            Расширенный фильтр
          </Button> */}
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
