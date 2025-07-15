import sendEmail from './sendEmail'

export type SendEmailWithBonusExpiringProps = {
  to: string
  subject: string
  body: string
}

export default async function sendEmailWithBonusExpiring({ to, subject, body }: SendEmailWithBonusExpiringProps) {
  return sendEmail({ email: to, subject, body })
}
