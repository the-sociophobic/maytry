import { FC } from 'react'

import useUser from '../hooks/useUser'
import printUsername from '../utils/printUsername'


const Login: FC = () => {
  const { data: user } = useUser()

  return (
    <div className='container'>
      {user &&
        <>
          Привет, {printUsername(user)}
        </>
      }
    </div>
  )
}


export default Login
