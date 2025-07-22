'use client'

import { FC } from 'react'

import useLogin from '../lib/hooks/user/useLogin'
import CredentialsInputLogin from '../lib/components/CredentialsInputLogin'


const Login: FC = () => {
  const login = useLogin()

  return (
    <CredentialsInputLogin
      label='Вход'
      buttonLabel='Войти'
      onClick={login}
    />
  )
}


export default Login
