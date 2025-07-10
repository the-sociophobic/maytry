import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

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
      await queryClient.invalidateQueries({ queryKey: ['user'] })
    } catch(err) {
      console.log(err)
    }
  }, [setToken, queryClient])

  return loginAfterOrder
}

const loginAfterOrderRequest = async (props: LoginAfterOrderRequestType) => {
  let res: LoginAfterOrderResponseType = { token: undefined }

  try {
    res = await post<LoginAfterOrderResponseType>(
      '/login-after-order',
      props
    )
  } catch(err) {
    console.log(err)
  }

  return res
}


export default useLoginAfterOrder
