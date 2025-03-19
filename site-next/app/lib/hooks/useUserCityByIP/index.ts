import { useQuery } from '@tanstack/react-query'

import getUserCityByIP from './getUserCityByIP'
import useUserIP from '../useUserIP'


const useUserCityByIP = () => {
  const { data: user_ip } = useUserIP()
  
  return useQuery({
    queryKey: ['orders', user_ip],
    queryFn: async () => getUserCityByIP(user_ip)
  })
}


export default useUserCityByIP
