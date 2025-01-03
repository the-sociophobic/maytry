import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { WebAppAuthObject } from '../utils/auth'
import { BoxberryDataType } from '../types/boxberry.type'
import { CombinedItemType } from '../types/contentful.type'
import { ItemInCartType } from '../types/site.type'


export type SortOrderType = 'asc' | 'desc'

export type StateType = {
  user: null | WebAppAuthObject
  setUser: (user: null | WebAppAuthObject) => void

  adminPassword: string
  setAdminPassword: (adminPassword: string) => void

  hoveredItem: CombinedItemType | undefined
  setHoveredItem: (hoveredItem: CombinedItemType | undefined) => void

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

  boxberryData?: BoxberryDataType
  setBoxberryData: (boxberryData: BoxberryDataType | undefined) => void

  userCity: string
  setUserCity: (userCity: string) => void

  userFullName: string
  setUserFullName: (userFullName: string) => void

  userPhone: string
  setUserPhone: (userPhone: string) => void

  userEmail: string
  setUserEmail: (userEmail: string) => void

  deliveryType: DeliveryTypeType
  setDeliveryType: (deliveryType: DeliveryTypeType) => void

  userAddress: string
  setUserAddress: (userAddress: string) => void

  userZIP: string
  setUserZIP: (userZIP: string) => void

  userZIP_DeliveryPrice: number
  setUserZIP_DeliveryPrice: (userZIP_DeliveryPrice: number) => void

  paymentType: PaymentTypeType
  setPaymentType: (paymentType: PaymentTypeType) => void

  parselCreateError: undefined | string
  setParselCreateError: (parselCreateError: undefined | string) => void

  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void

  hideCheckedOrders: boolean
  setHideCheckedOrders: (hideCheckedOrders: boolean) => void
}

export type MainPageViewType = 'IMG' | 'TXT'
// export type SortByType = 'Default' | 'Category' | 'Style' | 'Season'
export type DeliveryTypeType = 'Доставка до двери' | 'Пункт выдачи Boxberry'
export type PaymentTypeType = 'Оплата онлайн' | 'Оплата долями CloudPayments' | 'Оплата при получении'

const useStore = create(
  persist<StateType>(
    set => ({
      user: null,
      setUser: (user: null | WebAppAuthObject) => set({ user }),

      adminPassword: '',
      setAdminPassword: (adminPassword: string) => set({ adminPassword }),

      hoveredItem: undefined,
      setHoveredItem: (hoveredItem: CombinedItemType | undefined) => set({ hoveredItem }),

      mainPageView: 'IMG' as MainPageViewType,
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
      setBoxberryData: (boxberryData: BoxberryDataType | undefined) => set({ boxberryData }),

      userCity: '',
      setUserCity: (userCity: string) => set({ userCity }),

      userFullName: '',
      setUserFullName: (userFullName: string) => set({ userFullName }),

      userPhone: '',
      setUserPhone: (userPhone: string) => set({ userPhone }),

      userEmail: '',
      setUserEmail: (userEmail: string) => set({ userEmail }),

      deliveryType: 'Доставка до двери',
      setDeliveryType: (deliveryType: DeliveryTypeType) => set({ deliveryType }),

      userAddress: '',
      setUserAddress: (userAddress: string) => set({ userAddress }),

      userZIP: '',
      setUserZIP: (userZIP: string) => set({ userZIP }),

      userZIP_DeliveryPrice: 0,
      setUserZIP_DeliveryPrice: (userZIP_DeliveryPrice: number) => set({ userZIP_DeliveryPrice }),

      paymentType: 'Оплата онлайн',
      setPaymentType: (paymentType: PaymentTypeType) => set({ paymentType }),

      parselCreateError: undefined,
      setParselCreateError: (parselCreateError: undefined | string) => set({ parselCreateError }),
      
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),

      hideCheckedOrders: true,
      setHideCheckedOrders: (hideCheckedOrders: boolean) => set({ hideCheckedOrders }),
      
    }),
    {
      name: 'main-storage',
      // storage: createJSONStorage(() => sessionStorage)
    }
  )
)


export default useStore
