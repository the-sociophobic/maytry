import { create } from 'zustand'

import { WebAppAuthObject } from '../utils/auth'
import { ItemType } from './useContentful/types'
import { ItemInCartType } from '../pages/Cart'


export type StateType = {
  user: null | WebAppAuthObject
  setUser: (user: WebAppAuthObject) => void

  hoveredItem: ItemType | undefined
  setHoveredItem: (hoveredItem: ItemType | undefined) => void

  mainPageView: MainPageViewType
  setMainPageView: (mainPageView: MainPageViewType) => void

  showSearch: boolean
  setShowSearch: (showSearch: boolean) => void

  searchString: string
  setSearchString: (searchString: string) => void

  showSort: boolean
  setShowSort: (showSort: boolean) => void

  sortBy: SortByType
  setSortBy: (sortBy: SortByType) => void

  itemsInCart: ItemInCartType[]
  setItemInCart: (item: ItemInCartType, quantity: number) => void
}

export type MainPageViewType = 'IMG' | 'TXT'
export type SortByType = 'Default' | 'Category' | 'Style' | 'Season'


const useStore = create<StateType>(set => ({
  user: null,
  setUser: (user: WebAppAuthObject) => set({ user }),

  hoveredItem: undefined,
  setHoveredItem: (hoveredItem: ItemType | undefined) => set({ hoveredItem }),

  mainPageView: 'IMG',
  setMainPageView: (mainPageView: MainPageViewType) => set({ mainPageView }),

  showSearch: false,
  setShowSearch: (showSearch: boolean) => set({ showSearch }),

  searchString: '',
  setSearchString: (searchString: string) => set({ searchString }),

  showSort: false,
  setShowSort: (showSort: boolean) => set({ showSort }),

  sortBy: 'Default',
  setSortBy: (sortBy: SortByType) => set({ sortBy }),

  itemsInCart: [],
  setItemInCart: (item: ItemInCartType, quantity) => set(state => {
    const itemIndex = state.itemsInCart
      .map(itemInCart => itemInCart.id)
      .indexOf(item.id)

    return ({
      itemsInCart: [
        ...state.itemsInCart.slice(0, itemIndex),
        ...(quantity > 0 ? [{ ...item, quantity }] : []),
        ...state.itemsInCart.slice(itemIndex + 1),
      ]
    })
  }),

}))


export default useStore
