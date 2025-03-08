import { Request, Response } from 'express'
import _ from 'lodash'

import {
  ResponseErrorType,
  UserRequestType,
  UserResponseType
} from '../../types/requests.type'
import { UserType } from '../../types/user.type'
import storage from '../../units/storage'


const User = async (
  request: Request<{}, {}, UserRequestType>,
  response: Response<UserResponseType | ResponseErrorType>
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
}


export default User
