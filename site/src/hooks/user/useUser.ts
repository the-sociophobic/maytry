import { useQuery } from 'react-query'

import { post } from '../../utils/requests'
import {
  UserRequestType,
  UserResponseType
} from '../../types/requests.type'
import useStore from '../useStore'


const useUser = () => {
  const { token } = useStore()

  return useQuery(['user', token], () => getUser({ token }))
}

const getUser = async (
  props: UserRequestType
) =>
  post<UserResponseType>('/user', props)


export default useUser
