import { FC } from 'react'

import Layout from '../components/Layout'
import useUser from '../hooks/useUser'
import useRoute from '../hooks/useRoute'
import printUsername from '../utils/printUsername'


const Login: FC = () => {
  const route = useRoute()
  const { data: user } = useUser()

  return (
    <Layout
      title={route?.title || ''}
      description={route?.title || ''}
      navigations={[{
        title: 'Проверить',
        to: '/chapter-0',
        // disabled: audioState !== 'ended',
      }]}
    >
      {user &&
        <>
          Привет, {printUsername(user)}
        </>
      }
    </Layout>
  )
}


export default Login
