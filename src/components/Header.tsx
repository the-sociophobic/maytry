import { FC } from 'react'

import useStore, { SortByType } from '../hooks/useStore'
import { ItemType } from '../hooks/useContentful/types'
import LinkWrapper from './LinkWrapper'
import Button from './Button'
import Input from './Input'
import useRoute from '../hooks/useRoute'


export type HeaderProps = {}


const Header: FC<HeaderProps> = ({ }) => {
  const { hoveredItem } = useStore()
  const route = useRoute()

  return (
    <>
      <div className='Header Header--relative' />
      <div className='Header Header--fixed'>
        <div className='container'>
          <div className='h-100 d-flex flex-row align-items-center'>
            <LinkWrapper to='/'>
              <div className='Header__logo'>
                MAYTRY
              </div>
            </LinkWrapper>
            {route?.to === '/*' ?
              hoveredItem ?
                <HeaderPreview {...hoveredItem} />
                :
                <HeaderControls />
              :
              <LinkWrapper to='/'>
                <Button>
                  BACK TO INDEX
                </Button>
              </LinkWrapper>
            }
            <div className='d-flex flex-row ms-auto'>
              <div className='Header__section d-flex justify-content-end'>
                <LinkWrapper
                  to='/account'
                  className='d-inline-block'
                >
                  <Button hoverable>
                    YOUR ACCOUNT
                  </Button>
                </LinkWrapper>
              </div>
              <div className='Header__section d-flex justify-content-end'>
                <LinkWrapper
                  to='/login'
                  className='d-inline-block'
                >
                  <Button hoverable>
                    LOGOUT
                  </Button>
                </LinkWrapper>
              </div>
              <div className='Header__section d-flex justify-content-end'>
                <LinkWrapper
                  to='/cart'
                  className='d-inline-block'
                >
                  <Button hoverable>
                    CART
                  </Button>
                </LinkWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


const HeaderControls = () => {
  const { mainPageView } = useStore()
  const { setMainPageView } = useStore()
  const { showSearch } = useStore()
  const { setShowSearch } = useStore()
  const { searchString } = useStore()
  const { setSearchString } = useStore()
  const { showSort } = useStore()
  const { setShowSort } = useStore()
  const { sortBy } = useStore()
  const { setSortBy } = useStore()

  return (
    <div className='d-flex'>
      <div className='Header__section'>
        <Button onClick={() => setShowSort(!showSort)}>
          SORT
        </Button>
      </div>
      {!showSort ?
        <>
          <div className='Header__section d-flex'>
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
          </div>
          {showSearch ?
            <>
              <Input
                className='Header__section'
                value={searchString}
                onChange={setSearchString}
              />
              <Button onClick={() => setShowSearch(false)}>
                CLOSE
              </Button>
            </>
            :
            <Button onClick={() => setShowSearch(true)}>
              SEARCH
            </Button>
          }
        </>
        :
        <>
          {(['Default', 'Category', 'Style', 'Season'] as SortByType[])
            .map(sortType =>
              <Button
                hoverable
                gray={sortType === sortBy}
                onClick={() => setSortBy(sortType)}
              >
                {sortType}
              </Button>
            )
          }
          <Button
            onClick={() => setShowSort(false)}
            className='ms-5'
          >
            CLOSE
          </Button>
        </>
      }

    </div>
  )
}


const HeaderPreview = (item: ItemType) =>
  <>
    <div className='Header__section ps-3'>
      {item.name}
    </div>
    <div className='Header__section'>
      {item.price} RUB
    </div>
  </>

export default Header
