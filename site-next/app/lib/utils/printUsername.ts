import { WebAppAuthObject } from './auth'


const printName = (first_name?: string, last_name?: string): string =>
  `${first_name}${last_name ? ` ${last_name}` : ''}`

const printUsername = (user: Partial<WebAppAuthObject>): string =>
  user.username ? `@${user.username}` : printName(user.first_name, user.last_name)


export default printUsername
