import { Request, Response } from 'express'

import { DeliveryCalculationRequestType } from '../types/boxberry.type'
import deliveryCalculation from '../utils/boxberry/deliveryCalculation'


const DeliveryCalculation = async (
  request: Request<{}, {}, DeliveryCalculationRequestType>,
  response
) => {
  const { body } = request
  const result = await deliveryCalculation(body)

  response.send(result)
}


export default DeliveryCalculation
