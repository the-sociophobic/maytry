import { FC } from 'react'

import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import useStore from '../hooks/useStore'
import Button from '../components/Button'
import { getWebAppAuthObject } from '../utils/auth'
import LinkWrapper from '../components/LinkWrapper'


const Login: FC = () => {
  const { setUser } = useStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return (
    <div className='container'>
      <div className='row'>
        <h3 className='h3 mb-5'>
          Вход
        </h3>
        <p className='p'>

        </p>
        <LinkWrapper>
          <Button
            gray
            onClick={() => {
              setUser(getWebAppAuthObject()!)
              navigate('/account')
              setTimeout(() => queryClient.invalidateQueries({ queryKey: ['user'] }), 25)
            }}
          >
            Войти
          </Button>
        </LinkWrapper>
      </div>
    </div>
  )
}


export default Login
