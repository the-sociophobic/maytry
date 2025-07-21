import storage from '../../units/storage'
import sendEmailWithBonusExpiring from './sendEmailWithBonusExpiring'
import { UserType, BonusEntry } from '../../types/user.type'

const BONUS_NOTIFY_PERIODS = [
  { days: 30, key: 'notified1Month' },
  { days: 14, key: 'notified2Weeks' },
  { days: 7, key: 'notified1Week' },
  { days: 3, key: 'notified3Days' },
]

async function notifyExpiringBonuses() {
  console.log('Starting bonus notification job...')
  const users: UserType[] = await storage.read('users.json')
  console.log('Loaded users:', users.length)
  const now = Date.now()

  for (const user of users) {
    console.log('Checking user:', user.email)
    if (!user.bonuses) {
      console.log('User has no bonuses:', user.email)
      continue
    }
    let updated = false

    for (const bonus of user.bonuses) {
      console.log(
        `Bonus expires in ${(bonus.expiresAt - now) / (1000 * 60 * 60 * 24)} days for ${user.email}`
      )
      if (bonus.type !== 'urgent' || !bonus.expiresAt) continue

      for (const period of BONUS_NOTIFY_PERIODS) {
        const msBefore = period.days * 24 * 60 * 60 * 1000
        if (
          bonus.expiresAt - now < msBefore &&
          !bonus[period.key]
        ) {
          console.log('Attempting to send email for bonus:', bonus, 'to user:', user.email);
          try {
            // Send using Unisender template with variables
            const response = await sendEmailWithBonusExpiring({
              to: user.email,
              variables: {
                amount: bonus.amount,
                expiresAt: new Date(bonus.expiresAt).toLocaleDateString('ru-RU'),
                userName: user.fullName || '',
              }
            })
            console.log('Email send response:', response)
          } catch (err) {
            console.error('Email sending failed:', err)
          }
          bonus[period.key] = true
          updated = true
        }
      }
    }
    if (updated) {
      await storage.update('users.json', user)
    }
  }
}

notifyExpiringBonuses().then(() => {
  console.log('Bonus notifications sent')
  console.log('Reached process exit')
  process.exit(0)
})
