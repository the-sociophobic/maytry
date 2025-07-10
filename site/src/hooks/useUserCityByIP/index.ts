import { useQuery } from 'react-query'

import getUserCityByIP from './getUserCityByIP'
import useUserIP from '../useUserIP'


const useUserCityByIP = () => {
  const { data: user_ip } = useUserIP()
  
  return useQuery(
    ['orders', user_ip],
    () => getUserCityByIP(user_ip)
  )
}


export default useUserCityByIP
