import { useQuery } from '@tanstack/react-query'

import { get } from '../utils/requests'


const useOrdersIn1C = () => useQuery({
  queryKey: ['orders-in-1C'],
  queryFn: getOrdersIn1C
})

const getOrdersIn1C = async () => get<string[]>('/orders-in-1C')


export default useOrdersIn1C
