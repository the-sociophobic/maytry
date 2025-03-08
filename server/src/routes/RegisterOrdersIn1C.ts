import { Request, Response } from 'express'

import {
  RegisterIn1CRequestType,
  RegisterIn1CResponseType
} from '../types/requests.type'
import storage from '../units/storage'


const RegisterOrdersIn1C = async (
  request: Request<{}, {}, RegisterIn1CRequestType>,
  response: Response<RegisterIn1CResponseType>
) => {
  const { body: { orders } } = request
  await storage.write('orders-in-1C.json', { orders })
  
  const result = storage.read<RegisterIn1CResponseType>('orders-in-1C.json')
  response.send(result)
}


export default RegisterOrdersIn1C
