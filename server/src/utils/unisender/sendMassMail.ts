import storage from '../../units/storage'
import sendEmailWithBonusExpiring from './sendEmailWithBonusExpiring'
import { UserType } from '../../types/user.type'
import 'dotenv/config'

async function sendMassMail() {
  const users: UserType[] = await storage.read('users.json')
  for (const user of users) {
    if (!user.email) continue
    try {
      const response = await sendEmailWithBonusExpiring({
        to: user.email,
        variables: {
          amount: 0, // или другое значение, если нужно
          expiresAt: '', // или другое значение, если нужно
          userName: user.fullName || '',
        }
      });
      console.log('Unisender response:', response);
      console.log('Sent to', user.email)
    } catch (err) {
      console.error('Failed for', user.email, err)
    }
  }
}

sendMassMail().then(() => {
  console.log('All done')
  process.exit(0)
})
