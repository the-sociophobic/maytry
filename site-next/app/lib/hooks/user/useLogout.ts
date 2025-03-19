import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import useStore from '../useStore'


const useLogout = () => {
  const queryClient = useQueryClient()
  const { setToken } = useStore()

  const logout = useCallback(async () => {
    setToken(undefined)
    await queryClient.invalidateQueries({ queryKey: ['user'] })
  }, [setToken, queryClient])

  return logout
}


export default useLogout
