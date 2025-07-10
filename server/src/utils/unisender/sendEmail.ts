import axios from 'axios'

import encodeParams from '../encodeParams'


export type sendEmailProps = {
  email: string
  subject: string
  body: string
}


const { UNISENDER_API } = process.env


const sendEmail = async ({
  email,
  subject,
  body,
}: sendEmailProps) => {
  let res
    
  try {
    res = (await axios.get(
      'https://api.unisender.com/ru/api/sendEmail?' + encodeParams({
        format: 'json',
        api_key: UNISENDER_API,
        email,
        sender_name: 'maytry',
        sender_email: 'order@maytry.ru',
        subject,
        body,
        list_id: 9 // получен из getLists
      })
    )).data
  } catch (err) {
    console.log(err)
  }

  return res
}


export default sendEmail
