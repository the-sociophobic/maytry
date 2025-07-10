// https://zustand.docs.pmnd.rs/guides/nextjs

'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore as useStoreZustand } from 'zustand'

import { type StateType } from './state'
import createStore from './createStore'

export type CounterStoreApi = ReturnType<typeof createStore>

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
  undefined,
)

export interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({
  children,
}: StoreProviderProps) => {
  const storeRef = useRef<CounterStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createStore()
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export const useStore = <T,>(
  selector: (store: StateType) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useStore must be used within StoreProvider`)
  }

  return useStoreZustand(counterStoreContext, selector)
}
