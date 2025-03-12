import { FC } from 'react'

import useLogin from '../hooks/user/useLogin'
import CredentialsInput from '../components/CredentialsInput'
import { type Route } from 'react-router'


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


export function meta() {
  let aaa = 'f'
  if (window !== undefined)
    aaa = window.location.href

  return [
    { title: aaa },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}
