import sendEmail from './sendEmail'


export type sendEmailWithRegistrationProps = {
  email: string
  password: string
}


const sendEmailWithRegistration = async ({
  email,
  password
}: sendEmailWithRegistrationProps) => {
  const subject = `Вы зарегистрировались в системе Maytry`

  const body = `
Ваш email для входа: ${email}
<br><br>
Ваш пароль для входа: ${password}
`

  let res
    
  try {
    res = await sendEmail({
      email,
      subject,
      body
    })
  } catch (err) {
    console.log(err)
  }

  return res
}


export default sendEmailWithRegistration
