import { ContentfulPromocodeType } from './contentful.type'
import { ItemInCartType } from './site.type'


export type BoxberryDataType = {
  id: string
  zip: string
  name: string
  address: string
  phone: string
  workschedule: string
  period: string
  price: string
  prepaid: string
  loadlimit: string
}

export type ParselCreateRequestTypeBE = {
  order_id: string

  price: number
  payment_sum: number
  delivery_sum: number

  pvz_number?: string
  zip?: string
  city?: string
  address?: string

  fio: string
  phone: string
  email: string

  items: ParselCreateItemType[]

  promocode?: ContentfulPromocodeType
}

export type ParselCreateRequestTypeFE = Omit<ParselCreateRequestTypeBE, 'order_id' | 'items'> & {
  items: ItemInCartType[]
}

export type OrderType = ParselCreateRequestTypeFE & {
  order_id: string
  parcel: ParselCreateResponseType
  timestamp?: number
  registered_in_1C?: boolean
  promocode?: ContentfulPromocodeType
}

export type ParselCreateItemType = {
  id: string
  name: string
  UnitName: string // "шт."
  nds?: string
  price: number
  quantity: number
  marking_crpt?: string
}

export type ParselCreateResponseType = {
  track: string
  label: string
}
export type ParselCreateResponseErrorType = {
  err: string
}

export type ParselCreateResponseTypeBE = {
  parcel: ParselCreateResponseType
  order_id: string
  timestamp: number
  price: number,
  items: ItemInCartType[]
}


export type DeliveryCalculationRequestType = {
  // TargetStop: string
  OrderSum: number
  DeliverySum: number
  PaySum: number
  Zip: string
}

export type DeliveryCalculationResponseType = {
  error: boolean
  message?: string
  result: {
    DeliveryCosts: ParcelDeliveryCostType[]
  }
}

export type ParcelDeliveryCostType = {
  PriceService: number
  TotalPrice: number
  PriceBase: number
  DeliveryTypeId: number
  DeliveryPeriod: number
}
