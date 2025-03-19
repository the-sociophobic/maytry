'use client'

import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import {
  RegisterRequestType,
  RegisterResponseType
} from '../../types/requests.type'
import { post } from '../../utils/requests'
import useStore from '../useStore'


const useRegister = () => {
  const queryClient = useQueryClient()
  const { setToken } = useStore()

  const register = useCallback(async (props: RegisterRequestType) => {
    const { token } = await registerRequest(props)
    setToken(token)
    await queryClient.invalidateQueries({ queryKey: ['user'] })
  }, [setToken, queryClient])

  return register
}

const registerRequest = async (props: RegisterRequestType) =>
  post<RegisterResponseType>(
    '/register',
    props
  )


export default useRegister
