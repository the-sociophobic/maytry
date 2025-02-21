import { OrderType } from './boxberry.type'
import { UserType } from './user.type'


export type ResponseErrorType = {
  error: string
}

export type RegisterIn1CRequestType = {
  orders: string[]
}

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
