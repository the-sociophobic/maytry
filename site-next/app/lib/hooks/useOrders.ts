import { useQuery } from '@tanstack/react-query'

import { get } from '../utils/requests'
import { OrderType } from '../types/boxberry.type'


const useOrders = () => useQuery({
  queryKey: ['orders'],
  queryFn: getOrders
})

const getOrders = async () => get<OrderType[]>('/orders')


export default useOrders
