import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from '../hooks/user/useUser'
import useStore from '../hooks/useStore'


const Account: FC = () => {
  const { data: user } = useUser()
  const navigate = useNavigate()
  const { logged } = useStore()

  useEffect(() => {
    if (!logged)
      navigate('/')
  }, [logged, navigate])

  return (
    <div className='container'>
      {user &&
        <>
          Привет, {user.email}
        </>
      }
    </div>
  )
}


export default Account
