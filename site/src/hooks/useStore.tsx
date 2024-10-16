import { create } from 'zustand'

import { WebAppAuthObject } from '../utils/auth'
import { ItemType } from './useContentful/types'
import { ItemInCartType } from '../pages/Cart'
import { BoxberryResultType } from '../components/Boxberry'


export type SortOrderType = 'asc' | 'desc'

export type StateType = {
  user: null | WebAppAuthObject
  setUser: (user: null | WebAppAuthObject) => void

  hoveredItem: ItemType | undefined
  setHoveredItem: (hoveredItem: ItemType | undefined) => void

  mainPageView: MainPageViewType
  setMainPageView: (mainPageView: MainPageViewType) => void

  showSearch: boolean
  setShowSearch: (showSearch: boolean) => void

  searchString: string
  setSearchString: (searchString: string) => void

  showFilter: boolean
  setShowFilter: (showFilter: boolean) => void

  filterBy: string[]
  setFilterBy: (filterBy: string[]) => void

  showExtendedFilter: boolean
  setShowExtendedFilter: (showExtendedFilter: boolean) => void

  showAccount: boolean
  setShowAccount: (showAccount: boolean) => void

  itemsInCart: ItemInCartType[]
  setItemInCart: (item: ItemInCartType, quantity: number) => void
  emptyCart: () => void

  showStartBanner: boolean
  setShowStartBanner: (showStartBanner: boolean) => void

  priceFrom: undefined | number
  setPriceFrom: (priceFrom: undefined | number) => void

  priceTo: undefined | number
  setPriceTo: (priceFrom: undefined | number) => void

  sortOrder: SortOrderType
  setSortOrder: (sortOrder: SortOrderType) => void

  selectedColorIds: string[]
  setSelectedColorIds: (selectedColorIds: string[]) => void

  selectedSizesIds: string[]
  setSelectedSizesIds: (selectedSizesIds: string[]) => void

  boxberryData?: BoxberryResultType
  setBoxberryData: (boxberryData: BoxberryResultType | undefined) => void

  userCity?: string
  setUserCity: (userCity: string | undefined) => void
}

export type MainPageViewType = 'IMG' | 'TXT'
// export type SortByType = 'Default' | 'Category' | 'Style' | 'Season'


const useStore = create<StateType>(set => ({
  user: null,
  setUser: (user: null | WebAppAuthObject) => set({ user }),

  hoveredItem: undefined,
  setHoveredItem: (hoveredItem: ItemType | undefined) => set({ hoveredItem }),

  mainPageView: 'IMG',
  setMainPageView: (mainPageView: MainPageViewType) => set({ mainPageView }),

  showSearch: false,
  setShowSearch: (showSearch: boolean) => set({ showSearch }),

  searchString: '',
  setSearchString: (searchString: string) => set({ searchString }),

  showFilter: false,
  setShowFilter: (showFilter: boolean) => set({ showFilter }),

  filterBy: [],
  setFilterBy: (filterBy: string[]) => set({ filterBy }),

  showExtendedFilter: false,
  setShowExtendedFilter: (showExtendedFilter: boolean) => set({ showExtendedFilter }),

  showAccount: false,
  setShowAccount: (showAccount: boolean) => set({ showAccount }),

  itemsInCart: [],
  setItemInCart: (item: ItemInCartType, quantity) => set(state => {
    const itemIndex = state.itemsInCart
      .map(itemInCart => itemInCart.id)
      .indexOf(item.id)

    return ({
      itemsInCart: itemIndex !== -1 ? [
        ...state.itemsInCart.slice(0, itemIndex),
        ...(quantity > 0 ? [{ ...item, quantity }] : []),
        ...state.itemsInCart.slice(itemIndex + 1),
      ]
      :
      [
        ...state.itemsInCart,
        ...(quantity > 0 ? [{ ...item, quantity }] : [])
      ]
    })
  }),
  emptyCart: () => set({ itemsInCart: [] }),

  showStartBanner: true,
  setShowStartBanner: (showStartBanner: boolean) => set({ showStartBanner }),

  priceFrom: undefined,
  setPriceFrom: (priceFrom: undefined | number) => set({ priceFrom }),

  priceTo: undefined,
  setPriceTo: (priceTo: undefined | number) => set({ priceTo }),

  sortOrder: 'asc' as SortOrderType,
  setSortOrder: (sortOrder: SortOrderType) => set({ sortOrder }),

  selectedColorIds: [],
  setSelectedColorIds: (selectedColorIds: string[]) => set({ selectedColorIds }),

  selectedSizesIds: [],
  setSelectedSizesIds: (selectedSizesIds: string[]) => set({ selectedSizesIds }),

  boxberryData: undefined,
  setBoxberryData: (boxberryData: BoxberryResultType | undefined) => set({ boxberryData }),

  userCity: undefined,
  setUserCity: (userCity: string | undefined) => set({ userCity }),

}))


export default useStore
