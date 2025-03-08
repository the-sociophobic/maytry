import { Request, Response } from 'express'

import useOrders from '../hooks/useOrders'


const Orders = async (request: Request, response: Response) => {
  const orders = useOrders()

  response.send(orders)
}


export default Orders
