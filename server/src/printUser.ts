import fs from 'fs'
import path from 'path'
import { UserType } from './types/user.type'

const email = 'costiucigor2002@gmail.com'
const usersPath = path.join(__dirname, '../storage/users.json')

const users: UserType[] = JSON.parse(fs.readFileSync(usersPath, 'utf8'))
const user = users.find(u => u.email === email)

if (!user) {
    console.log('Пользователь не найден')
} else {
    console.log(JSON.stringify(user, null, 2))
}