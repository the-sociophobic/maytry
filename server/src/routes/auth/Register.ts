import { Request, Response } from 'express'

import {
  RegisterRequestType,
  RegisterResponseType,
  ResponseErrorType
} from '../../types/requests.type'
import { UserType } from '../../types/user.type'
import storage from '../../units/storage'
import generateToken from '../../utils/generateToken'
import sendEmailWithRegistration from '../../utils/unisender/sendEmailWithRegistration'


const Register = async (
  request: Request<{}, {}, RegisterRequestType>,
  response: Response<RegisterResponseType | ResponseErrorType>
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
}


export default Register
