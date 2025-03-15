import { useQuery } from 'react-query'

import { post } from '../../utils/requests'
import {
  UserRequestType,
  UserResponseType
} from '../../types/requests.type'
import useStore from '../useStore'


const useUser = () => {
  const { token } = useStore()

  return useQuery({
    queryKey: ['user', token],
    queryFn: async () => getUser({ token }),
    initialData: undefined,
  })
}

const getUser = async (
  props: UserRequestType
) => {
  let res: UserResponseType | undefined

  if (!props.token)
    return res
  
  try {
    res = await post<UserResponseType>('/user', props)
  } catch(err) {
    console.log(err)
  }

  return res
}


export default useUser
