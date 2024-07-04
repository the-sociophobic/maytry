import { create } from 'zustand'
import { WebAppAuthObject } from '../utils/auth'


export type StateType = {
  user: null | WebAppAuthObject
  setUser: (user: WebAppAuthObject) => void
}


const useStore = create<StateType>(set => ({
  user: null,
  setUser: (user: WebAppAuthObject) => set({ user: user }),
}))


export default useStore
