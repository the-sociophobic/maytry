import storage from "./units/storage";
import { addBonus } from './utils/bonuses'
import { UserType } from './types/user.type'

// Тестовый email
const testEmail = 'costiucigor2002@gmail.com'

async function run() {
  // 1. Получаем пользователя через storage
  const user = await storage.get<UserType>('users.json', { email: testEmail })

  if (!user) {
    console.log('User not found')
    process.exit(1)
  }

  // 2. Начисляем бонус
  addBonus(user, 2000, 'urgent', 'Тестовое начисление')

  // 3. Обновляем пользователя
  await storage.update('users.json', user)

  console.log('Бонус начислен!')
}

run()