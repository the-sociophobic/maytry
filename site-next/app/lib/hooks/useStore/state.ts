import { WebAppAuthObject } from '../../utils/auth'
import { BoxberryDataType } from '../../types/boxberry.type'
import { CombinedItemType, ContentfulPromocodeType } from '../../types/contentful.type'
import { ItemInCartType } from '../../types/site.type'
import dataLayer from '../../utils/dataLayer'
import {
  DeliveryTypeType,
  MainPageViewType,
  PaymentTypeType,
  SortOrderType
} from '../../types/frontend.type'


export type StateType = {
  user: null | WebAppAuthObject
  setUser: (user: null | WebAppAuthObject) => void

  loginEmail: string
  setLoginEmail: (loginEmail: string) => void

  loginPassword: string
  setLoginPassword: (loginPassword: string) => void

  authError: string
  setAuthError: (authError: string) => void

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

  mobileHeaderOpened: boolean
  setMobileHeaderOpened: (mobileHeaderOpened: boolean) => void

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

  currentPromocode: ContentfulPromocodeType | undefined
  setCurrentPromocode: (currentPromocode: ContentfulPromocodeType | undefined) => void

  token: string | undefined
  setToken: (token: string | undefined) => void

  logged: boolean
  setLogged: (logged: boolean) => void
}


export type initializerFnType = (
  partial: StateType | Partial<StateType> | ((state: StateType) => StateType | Partial<StateType>),
  replace?: false | undefined
) => void


export const initializer = (set: initializerFnType) => ({
  user: null,
  setUser: (user: null | WebAppAuthObject) => set({ user }),

  loginEmail: '',
  setLoginEmail: (loginEmail: string) => set({ loginEmail }),

  loginPassword: '',
  setLoginPassword: (loginPassword: string) => set({ loginPassword }),

  authError: '',
  setAuthError: (authError: string) => set({ authError }),

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

  mobileHeaderOpened: false,
  setMobileHeaderOpened: (mobileHeaderOpened: boolean) => set({ mobileHeaderOpened }),

  showAccount: true,
  setShowAccount: (showAccount: boolean) => set({ showAccount }),

  itemsInCart: [],
  setItemInCart: (item: ItemInCartType, quantity: number) => set(state => {
    const itemIndex = state.itemsInCart
      .map(itemInCart => itemInCart.id)
      .indexOf(item.id)
    const itemInCart = itemIndex !== -1 ? state.itemsInCart[itemIndex] : undefined
    const quantityUpdate = quantity - (itemInCart?.quantity || 0)

    if (quantityUpdate !== 0)
      dataLayer({
        actionType: quantityUpdate > 0 ? 'add' : 'remove',
        items: [{
          ...item,
          quantity: quantityUpdate
        }],
        promocode: state.currentPromocode
      })

    return ({
      itemsInCart: itemIndex !== -1 ?
        [
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

  deliveryType: 'Доставка до двери' as DeliveryTypeType,
  setDeliveryType: (deliveryType: DeliveryTypeType) => set({ deliveryType }),

  userAddress: '',
  setUserAddress: (userAddress: string) => set({ userAddress }),

  userZIP: '',
  setUserZIP: (userZIP: string) => set({ userZIP }),

  userZIP_DeliveryPrice: 0,
  setUserZIP_DeliveryPrice: (userZIP_DeliveryPrice: number) => set({ userZIP_DeliveryPrice }),

  paymentType: 'Оплата онлайн' as PaymentTypeType,
  setPaymentType: (paymentType: PaymentTypeType) => set({ paymentType }),

  parselCreateError: undefined,
  setParselCreateError: (parselCreateError: undefined | string) => set({ parselCreateError }),
  
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  hideCheckedOrders: true,
  setHideCheckedOrders: (hideCheckedOrders: boolean) => set({ hideCheckedOrders }),
  
  currentPromocode: undefined,
  setCurrentPromocode: (currentPromocode: ContentfulPromocodeType | undefined) => set({ currentPromocode }),

  token: undefined,
  setToken: (token: string | undefined) => set({ token }),

  logged: false,
  setLogged: (logged: boolean) => set({ logged }),
})