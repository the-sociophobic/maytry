import { Request, Response } from 'express'

import {
  LoginRequestType,
  LoginResponseType,
  ResponseErrorType
} from '../../types/requests.type'
import { UserType } from '../../types/user.type'
import storage from '../../units/storage'
import generateToken from '../../utils/generateToken'


const Login = async (
  request: Request<{}, {}, LoginRequestType>,
  response: Response<LoginResponseType | ResponseErrorType>
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
}


export default Login
