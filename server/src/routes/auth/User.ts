import { Request, Response } from 'express'
import _ from 'lodash'

import {
  ResponseErrorType,
  UserRequestType,
  UserResponseType
} from '../../types/requests.type'
import { UserType } from '../../types/user.type'
import storage from '../../units/storage'
import { v4 as uuidv4 } from 'uuid'


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
      response.send(user)
    }
  }
}

// Change password (user must be logged in)
export const changePassword = async (request: Request, response: Response): Promise<void> => {
  const { token, oldPassword, newPassword } = request.body
  if (!token || !oldPassword || !newPassword) {
    response.status(400).send({ error: 'Необходимы token, старый и новый пароль' })
    return
  }
  let user = await storage.get<UserType>('users.json', { token })
  if (!user) {
    response.status(401).send({ error: 'Неверный token' })
    return
  }
  if (user.password !== oldPassword) {
    response.status(401).send({ error: 'Старый пароль неверен' })
    return
  }
  user.password = newPassword
  await storage.update('users.json', user)
  response.send({ success: true })
}

// Request password reset (send email with token)
export const resetPasswordRequest = async (request: Request, response: Response): Promise<void> => {
  const { email } = request.body
  if (!email) {
    response.status(400).send({ error: 'Email обязателен' })
    return
  }
  let user = await storage.get<UserType>('users.json', { email })
  if (!user) {
    response.status(404).send({ error: 'Пользователь не найден' })
    return
  }
  const token = uuidv4()
  user.passwordResetToken = token
  user.passwordResetTokenExpires = Date.now() + 1000 * 60 * 60 // 1 hour
  await storage.update('users.json', user)
  // TODO: send email with token (user.passwordResetToken)
  response.send({ success: true })
}

// Reset password with token
export const resetPassword = async (request: Request, response: Response): Promise<void> => {
  const { email, token, newPassword } = request.body
  if (!email || !token || !newPassword) {
    response.status(400).send({ error: 'Email, token и новый пароль обязательны' })
    return
  }
  let user = await storage.get<UserType>('users.json', { email })
  if (!user || user.passwordResetToken !== token || !user.passwordResetTokenExpires || user.passwordResetTokenExpires < Date.now()) {
    response.status(400).send({ error: 'Неверный или истекший токен' })
    return
  }
  user.password = newPassword
  user.passwordResetToken = undefined
  user.passwordResetTokenExpires = undefined
  await storage.update('users.json', user)
  response.send({ success: true })
}

// Обновление персональных данных пользователя
export const updateUser = async (request: Request, response: Response): Promise<void> => {
  const { token, fullName, phone, birthdate, deliveryType, deliveryAddress } = request.body
  if (!token) {
    response.status(400).send({ error: 'Token обязателен' })
    return
  }
  let user = await storage.get<UserType>('users.json', { token })
  if (!user) {
    response.status(401).send({ error: 'Неверный token' })
    return
  }
  if (fullName !== undefined) user.fullName = fullName
  if (phone !== undefined) user.phone = phone
  if (birthdate !== undefined) user.birthdate = birthdate
  if (deliveryType !== undefined) user.deliveryType = deliveryType
  if (deliveryAddress !== undefined) user.deliveryAddress = deliveryAddress
  await storage.update('users.json', user)
  response.send({ success: true })
}


export default User
