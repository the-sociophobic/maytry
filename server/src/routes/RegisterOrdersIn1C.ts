import { Request, Response } from 'express'

import { RegisterIn1CRequestType } from '../types/requests.type'
import storage from '../units/storage'


const RegisterOrdersIn1C = async (
  request: Request<{}, {}, RegisterIn1CRequestType>,
  response: Response
) => {
  const { body: { orders } } = request
  await storage.write('orders-in-1C.json', { orders })
  
  const result = storage.read('orders-in-1C.json')
  response.send(result)
}


export default RegisterOrdersIn1C
