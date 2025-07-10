import { useQuery } from 'react-query'

import { get } from '../utils/requests'
import { OrderType } from '../types/boxberry.type'


const useOrders = () => useQuery('orders', getOrders)

const getOrders = async () => get<OrderType[]>('/orders')


export default useOrders
