import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'

import storage from './utils/storage'
import parselCreate from './utils/boxberry/parselCreate'
import deliveryCalculation from './utils/boxberry/deliveryCalculation'
import useCombinedData from './hooks/useCombinedData'
import {
  DeliveryCalculationRequestType,
  ParselCreateRequestTypeFE
} from './types/boxberry.type'
import useOrders from './hooks/useOrders'



const app = express()
app.use(cors())
app.use(express.json())

const { SERVER_PORT } = process.env


app.get('/data', async (request: Request, response: Response) => {
  response.send(await useCombinedData())
})

app.get('/update-data', async (request: Request, response: Response) => {
  storage.delete('combined.json')
  storage.delete('contentful.json')
  storage.delete('1C.json')
  setTimeout(async () => {
    await useCombinedData()

    response.send(true)
  }, 150)
})

app.get('/update-combined-data', async (request: Request, response: Response) => {
  storage.delete('combined.json')
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
  const result = await parselCreate(body)

  response.send(result)
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


const init = () => {
  app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
}

init()
