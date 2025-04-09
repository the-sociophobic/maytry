'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { FC, useEffect, useState } from 'react'

import useStore from '../../hooks/useStore'
import LinkWrapper from './../LinkWrapper'
import Button from './../Button'
import AccountControls from './AccountControls'

import logoImgSrc from '../../assets/images/logo.svg'
import HeaderControls from './HeaderControls'
import ExtendedFilter from './ExtendedFilter'
import Categories from './Categories'


const HeaderBody: FC = () => {
  const pathname = usePathname()
  const is_main_page = pathname === '/' || pathname.includes('categoriya')
  const is_cart_page = pathname === '/cart'


  const { itemsInCart } = useStore()
  const numberOfItemsInCart = itemsInCart
    .map(item => item.quantity)
    .reduce((a, b) => a + b, 0)
  const { setShowSearch } = useStore()
  const { setShowFilter } = useStore()
  const { showExtendedFilter } = useStore()
  const { setShowExtendedFilter } = useStore()
  const [mobileHeaderOpened, setMobileHeaderOpened] = useState(false)

  useEffect(() => {
    if (pathname !== '/' && !pathname.includes('categoriya'))
      setShowExtendedFilter(false)
  }, [
    pathname,
    setShowExtendedFilter
  ])

  useEffect(() =>
    setShowExtendedFilter(is_main_page && mobileHeaderOpened)
    , [setShowExtendedFilter, is_main_page, mobileHeaderOpened]
  )

  const closeMobileHeader = () => {
    setShowExtendedFilter(false)
    setMobileHeaderOpened(false)
  }
  useEffect(() => {
    if (pathname !== '/') {
      closeMobileHeader()
      setShowFilter(false)
      setShowSearch(false)
    }
  }, [])

  return (
    <div className='container-2'>
      <div className='Header__top'>
        <LinkWrapper to='/'>
          <Image
            src={logoImgSrc}
            className='Header__logo'
            alt='logo'
            priority
          />
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
          <div className='d-flex flex-row align-items-center w-100'>
            <HeaderControls />
            <div className='d-flex flex-row ms-auto'>
              <AccountControls />

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
      </div>

      {mobileHeaderOpened &&
        <div className={`Header__mobile no-padding ${!is_main_page && 'py-5'}`}>
          <HeaderControls />
          <AccountControls />

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

      {is_main_page &&
        <Categories />
      }

      {showExtendedFilter &&
        <ExtendedFilter />
      }

    </div>
  )
}


export default HeaderBody
