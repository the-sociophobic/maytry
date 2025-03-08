import { Request, Response } from 'express'

import useOrdersIn1C from '../hooks/useOrdersIn1C'


const OrdersIn1C = async (request: Request, response: Response) => {
  const ordersIn1C = useOrdersIn1C()

  response.send(ordersIn1C)
}


export default OrdersIn1C
