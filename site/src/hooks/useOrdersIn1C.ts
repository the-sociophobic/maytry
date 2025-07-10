import { useQuery } from 'react-query'

import { get } from '../utils/requests'


const useOrdersIn1C = () => useQuery('orders-in-1C', getOrdersIn1C)

const getOrdersIn1C = async () => get<string[]>('/orders-in-1C')


export default useOrdersIn1C
