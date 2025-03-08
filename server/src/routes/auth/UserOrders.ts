import { Request, Response } from 'express'
import _ from 'lodash'

import {
  ResponseErrorType,
  UserOrdersRequestType,
  UserOrdersResponseType,
} from '../../types/requests.type'
import { UserType } from '../../types/user.type'
import storage from '../../units/storage'
import useOrders from '../../hooks/useOrders'


const UserOrders = async (
  request: Request<{}, {}, UserOrdersRequestType>,
  response: Response<UserOrdersResponseType | ResponseErrorType>
) => {
  const { body: { token } } = request
  let user = await storage.get<UserType>('users.json', { token }) // TODO использовать id вместо email

  if (!user) {
    response.status(401)
      .send({ error: 'Неверный token' })
  } else {
    if (user.token !== token) {
      response.status(401)
        .send({ error: 'Неверный token пользователя' })
    } else {
      const orders = useOrders()
      const userOrders = orders.filter(order => order.email === user.email)
      response.send({ orders: userOrders })
    }
  }
}


export default UserOrders
