import { FC } from 'react'

import useLogin from '../hooks/user/useLogin'
import CredentialsInput from '../components/CredentialsInput'


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
