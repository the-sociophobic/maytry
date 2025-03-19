'use client'

import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import {
  LoginRequestType,
  LoginResponseType,
} from '../../types/requests.type'
import { post } from '../../utils/requests'
import useStore from '../useStore'


const useLogin = () => {
  const queryClient = useQueryClient()
  const { setToken } = useStore()

  const login = useCallback(async (props: LoginRequestType) => {
    const { token } = await loginRequest(props)
    setToken(token)
    await queryClient.invalidateQueries({ queryKey: ['user'] })
  }, [setToken, queryClient])

  return login
}

const loginRequest = async (props: LoginRequestType) =>
  post<LoginResponseType>(
    '/login',
    props
  )


export default useLogin
