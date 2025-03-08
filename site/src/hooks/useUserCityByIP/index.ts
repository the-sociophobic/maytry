import { useQuery } from 'react-query'

import getUserCityByIP from './getUserCityByIP'


const useUserCityByIP = () => {
  return useQuery('orders', getUserCityByIP)
}


export default useUserCityByIP
