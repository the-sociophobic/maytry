import { FC, useEffect, useRef, useState } from 'react'

import { useQueryClient } from 'react-query'

import useStore from '../hooks/useStore'
// import { ItemType } from '../hooks/useContentful/types'
import LinkWrapper from './LinkWrapper'
import Button from './Button'
import Input from './Input'
import useRoute from '../hooks/useRoute'
import useContentful from '../hooks/useContentful'
// import useUser from '../hooks/useUser'

import LogoImg from '../assets/images/logo.svg'
import { toggleInSet } from '../utils/sets'
import ColorSelector from './ColorSelector'
import SizeSelector from './SizeSelector'


export type HeaderProps = {}


const Header: FC<HeaderProps> = ({ }) => {
  // const { hoveredItem } = useStore()
  const { itemsInCart } = useStore()
  const numberOfItemsInCart = itemsInCart
    .map(item => item.quantity)
    .reduce((a, b) => a + b, 0)
  const route = useRoute()
  const is_main_page = route?.to === '/'
  const is_cart_page = route?.to === '/cart'
  // const { data: user } = useUser()
  const { user } = useStore()
  const { showAccount } = useStore()
  const { setShowAccount } = useStore()
  const { setShowSearch } = useStore()
  const { setShowFilter } = useStore()
  const { showExtendedFilter } = useStore()
  const { setShowExtendedFilter } = useStore()
  const { setUser } = useStore()
  const queryClient = useQueryClient()
  const headerRef = useRef<HTMLDivElement>(null)
  const [mobileHeaderOpened, setMobileHeaderOpened] = useState(false)

  useEffect(() =>
    setShowExtendedFilter(is_main_page && mobileHeaderOpened)
    , [is_main_page, mobileHeaderOpened])

  const closeMobileHeader = () => {
    setShowExtendedFilter(false)
    setMobileHeaderOpened(false)
  }
  useEffect(() => {
    closeMobileHeader()
    setShowFilter(false)
    setShowSearch(false)
  }, [route])

  return (
    <>
      <div
        className={`Header Header--relative`}
        style={headerRef.current?.clientHeight ? {
          minHeight: (!showExtendedFilter ? 80 : headerRef.current?.clientHeight) + 'px'
        } : {}}
      />
      <div
        ref={headerRef}
        className={`Header Header--fixed`}
      >
        <div className='container-2'>
          <div className='Header__top'>
            <LinkWrapper to='/'>
              {/* <img src={logoImg} className='Header__logo' /> */}
              <LogoImg className='Header__logo' />
            </LinkWrapper>

            {is_main_page ?
              <div
                className={`Header__burger ms-auto ${mobileHeaderOpened && 'Header__burger--opened'}`}
                onClick={() => setMobileHeaderOpened(!mobileHeaderOpened)}
              />
              :
              <LinkWrapper
                to='/cart'
                className='ms-auto mobile-only'
              >
                <Button black>
                  КОРЗИНА ({numberOfItemsInCart})
                </Button>
              </LinkWrapper>
            }

            <div className='Header__desktop'>
              {is_main_page ?
                <HeaderControls />
                :
                <LinkWrapper to='/'>
                  <Button>
                    {is_cart_page ? 'ПРОДОЛЖИТЬ ПОКУПКИ' : 'НА ГЛАВНУЮ'}
                  </Button>
                </LinkWrapper>
              }
              <div className='d-flex flex-row ms-auto'>
                {user ?
                  <>
                    <div className='Header__section d-flex justify-content-end'>
                      <LinkWrapper
                        to='/account'
                        className='d-inline-block'
                      >
                        <Button hoverable>
                          АККАУНТ
                        </Button>
                      </LinkWrapper>
                    </div>
                    <div className='Header__section d-flex justify-content-end'>
                      <Button
                        hoverable
                        onClick={() => {
                          setUser(null)
                          setTimeout(() => queryClient.invalidateQueries({ queryKey: ['user'] }), 25)
                        }}
                      >
                        ВЫЙТИ
                      </Button>
                    </div>
                  </>
                  :
                  showAccount ?
                    <>
                      <div className='Header__section d-flex justify-content-end'>
                        <LinkWrapper
                          to='/login'
                          className='d-inline-block'
                        >
                          <Button hoverable>
                            ВХОД
                          </Button>
                        </LinkWrapper>
                      </div>
                      <div className='Header__section d-flex justify-content-end'>
                        <LinkWrapper
                          to='/register'
                          className='d-inline-block'
                        >
                          <Button hoverable>
                            РЕГИСТРАЦИЯ
                          </Button>
                        </LinkWrapper>
                      </div>
                      <Button onClick={() => setShowAccount(false)}>
                        ЗАКРЫТЬ
                      </Button>
                    </>
                    :
                    <Button onClick={() => {
                      setShowAccount(true)
                      setShowSearch(false)
                      setShowFilter(false)
                    }}>
                      АККАУНТ
                    </Button>
                }

                <div className='Header__section d-flex justify-content-end'>
                  <LinkWrapper
                    to='/cart'
                    className='d-inline-block'
                  >
                    <Button black>
                      КОРЗИНА ({numberOfItemsInCart})
                    </Button>
                  </LinkWrapper>
                </div>
              </div>
            </div>
          </div>

          {mobileHeaderOpened &&
            <div className={`Header__mobile ${!is_main_page && 'py-5'}`}>
              {!is_main_page &&
                <LinkWrapper to='/'>
                  <Button>
                    {is_cart_page ? 'ПРОДОЛЖИТЬ ПОКУПКИ' : 'НА ГЛАВНУЮ'}
                  </Button>
                </LinkWrapper>
              }
              <LinkWrapper
                to='/cart'
                className='d-inline-block ms-auto'
                onClick={closeMobileHeader}
              >
                <Button black>
                  КОРЗИНА ({numberOfItemsInCart})
                </Button>
              </LinkWrapper>
            </div>
          }
          {showExtendedFilter &&
            <ExtendedFilter />
          }

        </div>
      </div>
    </>
  )
}


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
  const { selectedColorIds } = useStore()
  const { setSelectedColorIds } = useStore()
  const { selectedSizesIds } = useStore()
  const { setSelectedSizesIds } = useStore()

  return (
    <div className='Header__extended-filter'>
      <div className='d-flex flex-column'>
        <div className='d-flex flex-row align-items-center my-3'>
          <p className='m-0'>Категории:</p>
          {contentful?.categorys
            .map((category, index) =>
              <Button
                key={index}
                hoverable
                gray={filterBy.includes(category.name)}
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
        <ColorSelector
          colors={contentful?.colors || []}
          selectedColorIds={selectedColorIds}
          onChange={setSelectedColorIds}
          className='my-3'
        />
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


export default Header
