'use client'

import { FC } from 'react'

import useRegister from '../lib/hooks/user/useRegister'
import CredentialsInput from '../lib/components/CredentialsInput'


const Register: FC = () => {
  const register = useRegister()

  return (
    <CredentialsInput
      label='Регистрация'
      buttonLabel='Зарегистрироваться'
      onClick={register}
    />
  )
}


export default Register
