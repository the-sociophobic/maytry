import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'

import storage from './utils/storage'
import parselCreate from './utils/boxberry/parselCreate'
import deliveryCalculation from './utils/boxberry/deliveryCalculation'
import useCombinedData from './hooks/useCombinedData'
import {
  DeliveryCalculationRequestType,
  ParselCreateRequestTypeFE,
} from './types/boxberry.type'
import useOrders from './hooks/useOrders'
import useOrdersIn1C from './hooks/useOrdersIn1C'
import sendEmail from './utils/unisender/sendEmail'
import { incrementLastOrderId } from './hooks/useLastOrderId'



const app = express()
app.use(cors())
app.use(express.json())

const { SERVER_PORT } = process.env


app.get('/data', async (request: Request, response: Response) => {
  response.send(await useCombinedData())
})

app.get('/update-data', async (request: Request, response: Response) => {
  await storage.delete('combined.json')
  await storage.delete('contentful.json')
  await storage.delete('1C.json')
  setTimeout(async () => {
    await useCombinedData()

    response.send(true)
  }, 150)
})

app.get('/update-combined-data', async (request: Request, response: Response) => {
  await storage.delete('combined.json')
  setTimeout(async () => {
    await useCombinedData()

    response.send(true)
  }, 150)
})

app.post('/parsel-create', async (
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

  const emailRes = await sendEmail({
    email: body.email,
    order_id,
    timestamp,
    price,
    items,
    parcel
  })

  response.send(parcel)
})

app.post('/delivery-calculation', async (
  request: Request<{}, {}, DeliveryCalculationRequestType>,
  response
) => {
  const { body } = request
  const result = await deliveryCalculation(body)

  response.send(result)
})

app.get('/orders', async (request: Request, response: Response) => {
  const orders = useOrders()

  response.send(orders)
})


app.get('/orders-in-1C', async (request: Request, response: Response) => {
  const ordersIn1C = useOrdersIn1C()

  response.send(ordersIn1C)
})
export type RegisterIn1CRequestType = {
  orders: string[]
}
app.post('/register-orders-in-1C', async (
  request: Request<{}, {}, RegisterIn1CRequestType>,
  response
) => {
  const { body: { orders } } = request
  await storage.write('orders-in-1C.json', { orders })
  
  const result = storage.read('orders-in-1C.json')
  response.send(result)
})



const init = () => {
  app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
}

init()
