import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { initializer, StateType } from './state'


const USE_PERSIST_STATE = false


const useStore = USE_PERSIST_STATE ?
  create(
    persist<StateType>(
      initializer,
      {
        name: 'main-storage',
        // storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
  :
  create<StateType>(initializer)


export default useStore
