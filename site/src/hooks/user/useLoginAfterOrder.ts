import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

import {
  LoginAfterOrderRequestType,
  LoginAfterOrderResponseType
} from '../../types/requests.type'
import { post } from '../../utils/requests'
import useStore from '../useStore'


const useLoginAfterOrder = () => {
  const queryClient = useQueryClient()
  const { setToken } = useStore()

  const loginAfterOrder = useCallback(async (props: LoginAfterOrderRequestType) => {
    try {
      const { token } = await loginAfterOrderRequest(props)
      setToken(token)
      await queryClient.invalidateQueries({ queryKey: 'user' })
    } catch(err) {
      console.log(err)
    }
  }, [setToken, queryClient])

  return loginAfterOrder
}

const loginAfterOrderRequest = async (props: LoginAfterOrderRequestType) =>
  post<LoginAfterOrderResponseType>(
    '/login-after-order',
    props
  )


export default useLoginAfterOrder
