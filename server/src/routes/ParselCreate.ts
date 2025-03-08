import { Request, Response } from 'express'

import { ParselCreateRequestTypeFE } from '../types/boxberry.type'
import parselCreate from '../utils/boxberry/parselCreate'
import { incrementLastOrderId } from '../hooks/useLastOrderId'
import sendEmailWithOrderDetails from '../utils/unisender/sendEmailWithOrderDetails'


const ParselCreate = async (
  request: Request<{}, {}, ParselCreateRequestTypeFE>,
  response
) => {
  const { body } = request

  let parselCreateRes = undefined
  let numberOfTries = 5
  let parselCreateError

  while (numberOfTries-- > 0) {
    try {
      parselCreateRes = await parselCreate(body)
      break
    } catch (err) {
      parselCreateError = err
      if (err instanceof Error && err.message.match(/Значение «.*» для «Номер заказа в ИМ» уже занято\./)) {
        console.log(parselCreateError)
        await incrementLastOrderId(55)
        continue
      } else {
        break
      }
    }
  }

  console.log(parselCreateRes)
  console.log(parselCreateError)
  if (!parselCreateRes) {
    response.send(parselCreateError)
    return
  }

  const {
    parcel,
    order_id,
    timestamp,
    price,
    items
  } = parselCreateRes //TODO типы
  console.log(parselCreateRes)

  const emailRes = await sendEmailWithOrderDetails({
    email: body.email,
    order_id,
    timestamp,
    price,
    items,
    parcel
  })

  console.log(emailRes)

  response.send({ parcel })
}


export default ParselCreate
