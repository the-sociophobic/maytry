export type openCloudpaymentsProps = {
  amount: number
  onSuccess: (_options: any) => void
  onFail: (_reason: any, _options: any) => void
  onComplete: (_paymentResult: any, _options: any) => void
}


const openCloudpayments = (props: openCloudpaymentsProps) => {
  const { cp } = window
  const {
    amount,
    onSuccess,
    onFail,
    onComplete
  } = props
  var widget = new cp.CloudPayments()
  widget.pay('auth', // или 'charge'
    { //options
      publicId: 'pk_15732f58701e01bbff1459cfeb9bf', //id из личного кабинета
      description: 'Оплата товаров maytry', //назначение
      amount,
      currency: 'RUB', //валюта
      // accountId: 'user@example.com', //идентификатор плательщика (необязательно)
      // invoiceId: '1234567', //номер заказа  (необязательно)
      // email: 'user@example.com', //email плательщика (необязательно)
      skin: "mini", //дизайн виджета (необязательно)
      // autoClose: 3, //время в секундах до авто-закрытия виджета (необязательный)
      data: {
        myProp: 'myProp value'
      },
      // configuration: {
      //   common: {
      //     successRedirectUrl: "https://{ваш сайт}/success", // адреса для перенаправления 
      //     failRedirectUrl: "https://{ваш сайт}/fail"        // при оплате по T-Pay
      //   }
      // },
      payer: {
        firstName: 'Тест',
        lastName: 'Тестов',
        middleName: 'Тестович',
        birth: '1955-02-24',
        address: 'тестовый проезд дом тест',
        street: 'Lenina',
        city: 'MO',
        country: 'RU',
        phone: '123',
        postcode: '345'
      }
    },
    {
      onSuccess,
      onFail,
      onComplete
    }
  )
}


export default openCloudpayments
