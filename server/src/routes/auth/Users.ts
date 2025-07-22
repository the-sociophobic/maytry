import { Request, Response } from 'express'
import storage from '../../units/storage'
import { UserType } from '../../types/user.type'

const Users = async (req: Request, res: Response) => {
  const users: UserType[] = storage.read<UserType[]>('users.json') || []
  res.send(users)
}

export default Users 