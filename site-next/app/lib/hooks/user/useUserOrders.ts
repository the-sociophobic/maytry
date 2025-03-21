import { useQuery } from 'react-query'

import { post } from '../../utils/requests'
import {
  UserOrdersRequestType,
  UserOrdersResponseType
} from '../../types/requests.type'
import useStore from '../useStore'


const useUserOrders = () => {
  const { token } = useStore()

  return useQuery(['orders', token], () => getUserOrders({ token }))
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
