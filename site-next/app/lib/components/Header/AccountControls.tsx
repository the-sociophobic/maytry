'use client'

import { useEffect } from 'react'

import useLogout from '../../hooks/user/useLogout'
import useUser from '../../hooks/user/useUser'
import useStore from '../../hooks/useStore'
import LinkWrapper from '../LinkWrapper'
import Button from '../Button'


const AccountControls = () => {
  const { showAccount } = useStore()
  const { setShowAccount } = useStore()
  const { setShowSearch } = useStore()
  const { setShowFilter } = useStore()
  const logout = useLogout()

  const { data: user, isLoading: userIsLoading } = useUser()
  const { logged } = useStore()
  const { setLogged } = useStore()
  
  const { setShowExtendedFilter } = useStore()
  const { setMobileHeaderOpened } = useStore()

  const closeMobileHeader = () => {
    setShowExtendedFilter(false)
    setMobileHeaderOpened(false)
  }

  useEffect(() => {
    if (userIsLoading)
      return
  
    if (logged !== !!user)
      setLogged(!!user)
  }, [logged, setLogged, user, userIsLoading])

  return user ?
    <>
      <div className='Header__section d-flex justify-content-end'>
        <LinkWrapper
          to='/account'
          className='d-inline-block'
          onClick={closeMobileHeader}
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
            logout()
            closeMobileHeader()
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
            onClick={closeMobileHeader}
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
            onClick={closeMobileHeader}
            className='d-inline-block'
          >
            <Button hoverable>
              РЕГИСТРАЦИЯ
            </Button>
          </LinkWrapper>
        </div>
        {/* <Button onClick={() => setShowAccount(false)}>
          ЗАКРЫТЬ
        </Button> */}
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


export default AccountControls
