import { Request, Response } from 'express'

import {
  LoginAfterOrderRequestType,
  LoginAfterOrderResponseType,
  ResponseErrorType
} from '../../types/requests.type'
import { UserType } from '../../types/user.type'
import storage from '../../units/storage'
import generateToken from '../../utils/generateToken'
import generatePassword from '../../utils/generatePassword'
import sendEmailWithRegistration from '../../utils/unisender/sendEmailWithRegistration'


const LoginAfterOrder = async (
  request: Request<{}, {}, LoginAfterOrderRequestType>,
  response: Response<LoginAfterOrderResponseType | ResponseErrorType>
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
}


export default LoginAfterOrder
