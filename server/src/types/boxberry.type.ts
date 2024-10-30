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
}

export type ParselCreateRequestTypeFE = Omit<ParselCreateRequestTypeBE, 'order_id'>

export type ParselCreateItemType = {
  id: string
  name: string
  UnitName: string // "шт."
  nds?: string
  price: number
  quantity: number
  marking_crpt?: string
}

export type ParselCreateResponceType = {
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

export type ParselCreateErrorType = {
  err: string
}


export type DeliveryCalculationRequestType = {
  // TargetStop: string
  OrderSum: string
  DeliverySum: string
  PaySum: string
  Zip: string
}

export type DeliveryCalculationResponceType = {
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
