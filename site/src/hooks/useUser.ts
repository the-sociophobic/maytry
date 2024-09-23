import { useQuery } from 'react-query'

import { getWebAppAuthObject } from '../utils/auth'
import useStore from './useStore'


export const getUser = async () => {
  // return await get(`/user/`)
  return getWebAppAuthObject()
}

const useUser = () => {
  const { user } = useStore()
  
  return useQuery('user', () => user)
}


export default useUser
