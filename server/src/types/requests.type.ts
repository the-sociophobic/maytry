import { OrderType } from './boxberry.type'
import { UserType } from './user.type'


export type ResponseErrorType = {
  error: string
}

export type RegisterIn1CRequestType = {
  orders: string[]
}
export type RegisterIn1CResponseType = RegisterIn1CRequestType

export type LoginRequestType = Pick<UserType, 'email' | 'password'>
export type LoginResponseType = Pick<UserType, 'token'>

export type LoginAfterOrderRequestType = Pick<UserType, 'email'>
export type LoginAfterOrderResponseType = LoginResponseType

export type RegisterRequestType = LoginRequestType
export type RegisterResponseType = LoginResponseType

export type UserRequestType = Pick<UserType, 'token'>
export type UserResponseType = Pick<UserType, 'id' | 'email' | 'registrationDate'>

export type UserOrdersRequestType = Pick<UserType, 'token'>
export type UserOrdersResponseType = { orders: OrderType[] }

export type IpifyGetUserIPResponceType = { ip: string }
export type CityByIPRequestType = { ip: string }
export type CityByIPResponseType = { city: string }
export type GetUserLocationResultType = {
  asn: string
  city: string
  continent_code: string
  country: string
  country_area: number
  country_calling_code: string
  country_capital: string
  country_code: string
  country_code_iso3: string
  country_name: string
  country_population: number
  country_tld: string
  currency: string
  currency_name: string
  in_eu:false
  ip: string
  languages: string
  latitude: number
  longitude: number
  network: string
  org: string
  postal: string
  region: string
  region_code: string
  timezone: string
  utc_offset: string
  version: string
}
