import { useQuery } from '@tanstack/react-query'

import getUserCityByIP from './getUserCityByIP'
import useUserIP from '../useUserIP'


const useUserCityByIP = () => {
  const { data: user_ip } = useUserIP()
  
  return useQuery({
    queryKey: ['user_ip', user_ip],
    queryFn: async () => getUserCityByIP(user_ip || undefined)
  })
}


export default useUserCityByIP
