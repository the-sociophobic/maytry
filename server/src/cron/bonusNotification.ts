import storage from '../units/storage'
import sendEmail from '../utils/unisender/sendEmailWithBonusExpiring'
import { UserType, BonusEntry } from '../types/user.type'

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
            const htmlBody = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Ваш бонус скоро сгорит!</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#fff; font-family:'Golos', 'Atlas Grotesk', Arial, sans-serif; color:#0E0E0E;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:480px; margin:48px auto 0 auto; background:#fff; border-radius:0; border:0;">
          <tr>
            <td style="padding:0 0 32px 0; text-align:center;">
              <!-- Logo -->
              <div style="margin:0 auto 32px auto; width:180px;">
                <!-- SVG LOGO START -->
                <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 150 800 650" style="width:180px; height:auto; display:block; margin:0 auto;" xml:space="preserve"><g><path fill="#0E0E0E" d="M148.62,401.66h-17.26v-49.42l-37.23,29.29h-3.8l-60.12-46.65v-2.27h23.33l38.71,29.98l38.66-29.98h17.7V401.66z"/><path fill="#0E0E0E" d="M232.02,348.25l-39.4,53.41h-18.3v-2.27l48.87-66.77h18l48.92,66.77v2.27h-18.44L232.02,348.25z"/><path fill="#0E0E0E" d="M356.89,364.28l33.63-31.66h21.35v2.27l-46.5,43.55v23.23h-17.26v-23.28l-46.41-43.5v-2.27h21.55L356.89,364.28z"/><path fill="#0E0E0E" d="M528.12,348.15h-42.71v53.51h-17.26v-53.51h-42.71v-15.53h102.68V348.15z"/><path fill="#0E0E0E" d="M638.39,351.55v4.44c0,12.23-6.66,18.89-18.89,18.89h-11.74l32.3,24.51v2.27h-20.81l-45.91-34.52v-7.74h42.21c4.83,0,5.57-0.79,5.57-5.62c0-4.88-0.74-5.62-5.57-5.62h-68.5v-15.53h72.45C631.73,332.62,638.39,339.27,638.39,351.55z"/><path fill="#0E0E0E" d="M713.45,364.28l33.63-31.66h21.35v2.27l-46.5,43.55v23.23h-17.26v-23.28l-46.41-43.5v-2.27h21.55L713.45,364.28z"/></g></svg>
                <!-- SVG LOGO END -->
              </div>
              <h2 style="font-size:18px; font-weight:700; letter-spacing:0.1em; color:#0E0E0E; margin:0 0 32px 0; text-transform:uppercase;">ВАШ БОНУС СКОРО СГОРИТ</h2>
              <div style="background:#0E0E0E; color:#fff; display:inline-block; padding:24px 32px; border-radius:8px; margin-bottom:32px;">
                <div style="font-size:16px; font-weight:500; margin-bottom:8px;">Срочный бонус</div>
                <div style="font-size:28px; font-weight:700; letter-spacing:0.05em; margin-bottom:8px; color:#0E0E0E; background:#fff; display:inline-block; padding:4px 16px; border-radius:4px;">${bonus.amount} РУБ.</div>
                <div style="font-size:14px; color:#fff; margin-bottom:0;">Сгорит <span style="color:#fff; font-weight:700; background:#0E0E0E; padding:2px 8px; border-radius:3px;">${new Date(bonus.expiresAt).toLocaleDateString()}</span></div>
              </div>
              <div style="margin-bottom:32px;">
                <a href="https://maytry.ru/account" style="display:inline-block; padding:12px 32px; background:#0E0E0E; color:#fff; border-radius:6px; text-decoration:none; font-size:16px; font-weight:600; letter-spacing:0.05em;">ПЕРЕЙТИ В ЛИЧНЫЙ КАБИНЕТ</a>
              </div>
              <div style="font-size:13px; color:#B0B0B0; margin-bottom:0;">Если есть вопросы - <a href="mailto:order@maytry.ru" style="color:#0E0E0E; text-decoration:none;">order@maytry.ru</a></div>
            </td>
          </tr>
        </table>
        <p style="font-size:11px; color:#B0B0B0; margin:32px 0 0 0; text-align:center; letter-spacing:0.05em;">© Maytry, 2025</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
            const response = await sendEmail({
              to: 'costiucigor2002@gmail.com',
              subject: `Ваш бонус скоро сгорит!`,
              body: htmlBody
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
