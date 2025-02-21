import { FC } from 'react'

import useRegister from '../hooks/user/useRegister'
import CredentialsInput from '../components/CredentialsInput'


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
