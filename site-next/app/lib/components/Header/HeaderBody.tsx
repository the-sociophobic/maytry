'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { FC, useEffect, useRef, useState } from 'react'

import useStore from '../../hooks/useStore'
import LinkWrapper from './../LinkWrapper'
import Button from './../Button'
import AccountControls from './AccountControls'

import logoImgSrc from '../../assets/images/logo.svg'
import HeaderControls from './HeaderControls'
import ExtendedFilter from './ExtendedFilter'


export type HeaderBodyProps = {
  // pathname: string
  // is_main_page: boolean
  // is_cart_page: boolean
}


const HeaderBody: FC<HeaderBodyProps> = ({
  // pathname,
  // is_main_page,
  // is_cart_page,
}) => {
  // const { hoveredItem } = useStore()
  const pathname = usePathname()
  const is_main_page = pathname === '/'
  const is_cart_page = pathname === '/cart'


  const { itemsInCart } = useStore()
  const numberOfItemsInCart = itemsInCart
    .map(item => item.quantity)
    .reduce((a, b) => a + b, 0)
  const { setShowSearch } = useStore()
  const { setShowFilter } = useStore()
  const { showExtendedFilter } = useStore()
  const { setShowExtendedFilter } = useStore()
  const headerRef = useRef<HTMLDivElement>(null)
  const [mobileHeaderOpened, setMobileHeaderOpened] = useState(false)

  useEffect(() => {
    if (pathname !== '/')
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
    <>
      <div
        className={`Header Header--relative`}
        style={headerRef.current?.clientHeight ? {
          minHeight: (!showExtendedFilter ? 70 : headerRef.current?.clientHeight) + 'px'
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

          {mobileHeaderOpened &&
            <div className={`Header__mobile ${!is_main_page && 'py-5'}`}>
              {!is_main_page &&
                <LinkWrapper to='/'>
                  <Button>
                    {is_cart_page ? 'ПРОДОЛЖИТЬ ПОКУПКИ' : 'НА ГЛАВНУЮ'}
                  </Button>
                </LinkWrapper>
              }
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
          {showExtendedFilter &&
            <ExtendedFilter />
          }

        </div>
      </div>
    </>
  )
}


export default HeaderBody
