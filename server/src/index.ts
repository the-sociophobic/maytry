import express, { Request, Response } from 'express'
import cors from 'cors'
import _ from 'lodash'
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
import sendEmailWithOrderDetails from './utils/unisender/sendEmailWithOrderDetails'
import { incrementLastOrderId } from './hooks/useLastOrderId'
import checkEmail from './utils/unisender/checkEmail'
import { UserType } from './types/user.type'
import generateToken from './utils/generateToken'
import generatePassword from './utils/generatePassword'
import sendEmailWithRegistration from './utils/unisender/sendEmailWithRegistration'
import {
  LoginAfterOrderRequestType,
  LoginAfterOrderResponseType,
  LoginRequestType,
  LoginResponseType,
  RegisterIn1CRequestType,
  RegisterRequestType,
  RegisterResponseType,
  ResponseErrorType,
  UserOrdersRequestType,
  UserOrdersResponseType,
  UserResponseType
} from './types/requests.type'



const app = express()
app.use(cors())
app.use(express.json())

const { SERVER_PORT } = process.env


app.get('/data', async (request: Request, response: Response, next) => {
  response.send(await useCombinedData())
  next()
})

app.get('/update-data', async (request: Request, response: Response, next) => {
  await storage.delete('combined.json')
  await storage.delete('contentful.json')
  await storage.delete('1C.json')
  setTimeout(async () => {
    await useCombinedData()

    response.send(true)
    next()
  }, 150)
})

app.get('/update-combined-data', async (request: Request, response: Response, next) => {
  await storage.delete('combined.json')
  setTimeout(async () => {
    await useCombinedData()

    response.send(true)
    next()
  }, 150)
})

app.post('/parsel-create', async (
  request: Request<{}, {}, ParselCreateRequestTypeFE>,
  response,
  next
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
    next()
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
  next()
})

app.post('/delivery-calculation', async (
  request: Request<{}, {}, DeliveryCalculationRequestType>,
  response, next
) => {
  const { body } = request
  const result = await deliveryCalculation(body)

  response.send(result)
  next()
})

app.get('/orders', async (request: Request, response: Response, next) => {
  const orders = useOrders()

  response.send(orders)
  next()
})


app.get('/orders-in-1C', async (request: Request, response: Response, next) => {
  const ordersIn1C = useOrdersIn1C()

  response.send(ordersIn1C)
  next()
})

app.post('/register-orders-in-1C', async (
  request: Request<{}, {}, RegisterIn1CRequestType>,
  response, next
) => {
  const { body: { orders } } = request
  await storage.write('orders-in-1C.json', { orders })
  
  const result = storage.read('orders-in-1C.json')
  response.send(result)
  next()
})

app.get('/testt', async (request: Request, response: Response, next) => {
  // const res = await listMessages('2024-12-25 00:00', '2025-01-01 00:00')
  const res = await checkEmail([35242423201, 35242423202])
  console.log(res)

  response.send(res)
  next()
})

// AUTHORIZATION START
app.post('/login', async (
  request: Request<{}, {}, LoginRequestType>,
  response: Response<LoginResponseType | ResponseErrorType>,
  next
) => {
  const { body: { email, password } } = request
  let user = await storage.get<UserType>('users.json', { email }) // TODO использовать id вместо email

  if (!user) {
    response.status(401)
      .send({ error: 'Нет пользователя с таким email' })
  } else {
    if (user.password !== password) {
      response.status(401)
        .send({ error: 'Неверный пароль' })
    } else {
      if (!user.token) {
        const token = generateToken(email)
        user.token = token
        await storage.update('users.json', user)
      }
      response.send({ token: user.token })
    }
  }
  next()
})

app.post('/login-after-order', async (
  request: Request<{}, {}, LoginAfterOrderRequestType>,
  response: Response<LoginAfterOrderResponseType | ResponseErrorType>,
  next
) => {
  const { body: { email } } = request
  let user = await storage.get<UserType>('users.json', { email }) // TODO использовать id вместо email

  if (user) {
    response.status(401)
      .send({ error: 'Пользователь уже зарегестрирован в системе. Надо входить по паролю' })
  } else {
    const password = generatePassword(email)
    const token = generateToken(email)
    user = {
      id: email,
      email,
      password,
      token,
      registrationDate: (new Date()).getTime()
    }
    await storage.update('users.json', user)
    await sendEmailWithRegistration({ email, password })
    response.send({ token })
  }
  next()
})

app.post('/register', async (
  request: Request<{}, {}, RegisterRequestType>,
  response: Response<RegisterResponseType | ResponseErrorType>,
  next
) => {
  const { body: { email, password } } = request
  let user = await storage.get<UserType>('users.json', { email }) // TODO использовать id вместо email

  if (user) {
    response.status(401)
      .send({ error: 'Пользователь с таким email уже существует'})
  } else {
    const token = generateToken(email)
    user = {
      id: email,
      email,
      password,
      token,
      registrationDate: (new Date()).getTime()
    }
    await storage.update('users.json', user)
    await sendEmailWithRegistration({ email, password })
    response.send({ token })
  }
  next()
})

app.post('/user', async (
  request: Request<{}, {}, UserOrdersRequestType>,
  response: Response<UserResponseType | ResponseErrorType>,
  next
) => {
  const { body: { token } } = request
  let user = await storage.get<UserType>('users.json', { token }) // TODO использовать id вместо email

  if (!user) {
    response.status(401)
      .send({ error: 'Неверный token'})
  } else {
    if (!token || !user.token || user.token !== token) {
      response.status(401)
        .send({ error: 'Неверный token пользователя' })
    } else {
      response.send(_.pick(user, ['id', 'email', 'registrationDate']))
    }
  }
  next()
})

app.post('/user-orders', async (
  request: Request<{}, {}, UserOrdersRequestType>,
  response: Response<UserOrdersResponseType | ResponseErrorType>,
  next
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
  next()
})
// AUTHORIZATION END

const init = () => {
  app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
}

init()
