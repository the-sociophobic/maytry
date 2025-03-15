import { useQuery } from 'react-query'

import { post } from '../../utils/requests'
import {
  UserOrdersRequestType,
  UserOrdersResponseType
} from '../../types/requests.type'
import useStore from '../useStore'


const useUserOrders = () => {
  const { token } = useStore()

  return useQuery({
    queryKey: ['orders', token],
    queryFn: async () => getUserOrders({ token }),
    initialData: { orders: [] },
  })
}

const getUserOrders = async (
  props: UserOrdersRequestType
) =>
  post<UserOrdersResponseType>('/user-orders', props)


export default useUserOrders
