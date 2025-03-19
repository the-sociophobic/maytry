'use client'

import { FC } from 'react'

import useLogin from '../lib/hooks/user/useLogin'
import CredentialsInput from '../lib/components/CredentialsInput'


const Login: FC = () => {
  const login = useLogin()

  return (
    <CredentialsInput
      label='Вход'
      buttonLabel='Войти'
      onClick={login}
    />
  )
}


export default Login
