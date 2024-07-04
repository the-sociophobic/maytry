import { useQuery } from 'react-query'

import { getWebAppAuthObject } from '../utils/auth'


export const getUser = async () => {
  // return await get(`/user/`)
  return getWebAppAuthObject()
}

const useUser = () => {
  return useQuery('user', getUser)
}


export default useUser
