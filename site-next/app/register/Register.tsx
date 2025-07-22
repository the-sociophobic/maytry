'use client'

import { FC } from 'react'

import useRegister from '../lib/hooks/user/useRegister'
import CredentialsInputRegister from '../lib/components/CredentialsInputRegister'


const Register: FC = () => {
  const register = useRegister()

  return (
    <CredentialsInputRegister
      label='Регистрация'
      buttonLabel='Зарегистрироваться'
      onClick={register}
    />
  )
}


export default Register
