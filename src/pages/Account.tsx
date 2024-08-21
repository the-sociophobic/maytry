import { FC } from 'react'

// import useUser from '../hooks/useUser'
import printUsername from '../utils/printUsername'
import useStore from '../hooks/useStore'


const Account: FC = () => {
  // const { data: user } = useUser()
  const { user } = useStore()

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


export default Account
