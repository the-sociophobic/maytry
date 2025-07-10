import { useQuery } from '@tanstack/react-query'

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
    queryFn: () => getUserOrders({ token })
  })
}

const getUserOrders = async (
  props: UserOrdersRequestType
) => {
  let res: UserOrdersResponseType = { orders: [] }

  if (!props.token)
    return res

  try {
    res = await post<UserOrdersResponseType>('/user-orders', props)
  } catch(err) {
    console.log(err)
  }

  return res
}


export default useUserOrders
