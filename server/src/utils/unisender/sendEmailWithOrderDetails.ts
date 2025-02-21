import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { ItemInCartType } from '../../types/site.type'
import { printPrice } from '../price'
import { ParselCreateResponseType } from '../../types/boxberry.type'
import sendEmail from './sendEmail'


export type sendEmailWithOrderDetailsProps = {
  email: string
  order_id: string
  timestamp: number
  price: number
  items: ItemInCartType[]
  parcel: ParselCreateResponseType
}


const sendEmailWithOrderDetails = async ({
  email,
  order_id,
  timestamp,
  price,
  items,
  parcel
}: sendEmailWithOrderDetailsProps) => {
  const subject = `Ваш заказ Maytry #${order_id} успешно оформлен`

  const order_date = format(
    new Date(timestamp),
    'd MMM yyyy, HH:mm:ss',
    { locale: ru }
  )

  const order_details = items
    .map((item, itemIndex) =>
      `${itemIndex + 1}. ${item.name} ${item.color?.name} ${item.size.name} – ${item.quantity} × ${printPrice(item.salePrice || item.price)} = ${printPrice((item.salePrice || item.price) * item.quantity)}`)
    .join('<br>')

  const body = `
Вы успешно оформили заказ #${order_id} от ${order_date} на сумму ${price} рублей:
<br><br>
${order_details}
<br><br>
Трек-номер вашего заказа: ${parcel.track}. В ближайшее время мы передадим его службе доставки Boxberry. Информацию обо всех перемещениях посылки можно найти на сайте службы доставки: https://boxberry.ru/tracking-page. Как только посылка поступит в пункт выдачи / курьеру, вам придёт СМС-уведомление на указанный при оформлении номер.
<br><br>
При возникновении каких-либо вопросов свяжитесь с нами любым удобным для вас способом: https://maytry.ru/#/contacts
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


export default sendEmailWithOrderDetails
