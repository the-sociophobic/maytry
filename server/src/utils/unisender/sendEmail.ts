import axios from 'axios'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import encodeParams from '../encodeParams'
import { ItemInCartType } from '../../types/site.type'
import { printPrice } from '../price'
import { ParselCreateResponceType } from '../../types/boxberry.type'


export type sendEmailProps = {
  email: string
  order_id: string
  timestamp: number
  price: number
  items: ItemInCartType[]
  parcel: ParselCreateResponceType
}


const { UNISENDER_API } = process.env


const sendEmail = async ({
  email,
  order_id,
  timestamp,
  price,
  items,
  parcel
}: sendEmailProps) => {
  const order_date = format(
    new Date(timestamp),
    'd MMM yyyy, HH:mm:ss',
    { locale: ru }
  )

  const order_details = items
    .map((item, itemIndex) =>
      `${itemIndex + 1}. ${item.name} – ${item.quantity} × ${printPrice(item.salePrice || item.price)} = ${printPrice((item.salePrice || item.price) * item.quantity)}`)
    .join('<br>')

  const body = `
Вы успешно оформили заказ #${parcel.track} от ${order_date} на сумму ${price} рублей.
<br><br>
${order_details}
<br><br>
В ближайшее время заказ будет передан службе доставки Boxberry. Номер заказа ${parcel.track} - ваш трек-номер. Информацию обо всех перемещениях посылки можно найти на сайте службы доставки: https://boxberry.ru/tracking-page Как только посылка поступит в пункт выдачи (курьеру), вам придёт СМС-уведомление на указанный вами номер. 
<br><br>
При возникновении каких-либо вопросов свяжитесь с нами любым удобным для вас способом: https://maytry.ru/faq#contacts
<br><br>
С уважением,<br>
Команда Maytry
`

  let res
    
  try {
    res = (await axios.get(
      'https://api.unisender.com/ru/api/sendEmail?' + encodeParams({
        format: 'json',
        api_key: UNISENDER_API,
        email,
        sender_name: 'maytry',
        sender_email: 'order@maytry.ru',
        subject: 'Заказ оформлен',
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
