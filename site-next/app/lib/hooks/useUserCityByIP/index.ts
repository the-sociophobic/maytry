import { useQuery } from '@tanstack/react-query'

import getUserCityByIP from './getUserCityByIP'
import useUserIP from '../useUserIP'


const useUserCityByIP = () => {
  const { data: _user_ip } = useUserIP()
  const user_ip = _user_ip || null
  
  return useQuery({
    queryKey: ['user_ip', user_ip],
    queryFn: async () => getUserCityByIP(user_ip)
  })
}


export default useUserCityByIP
