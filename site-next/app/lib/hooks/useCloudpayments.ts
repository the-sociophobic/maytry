import { useCallback } from 'react'
import useStore from './useStore'
import isProd from '../utils/isProd'


export type openCloudpaymentsProps = {
  amount: number
  description: string
  onSuccess: (_options: any) => void
  onFail: (_reason: any, _options: any) => void
  onComplete: (_paymentResult: any, _options: any) => void
}


const CLOUDPAYMENTS_TOKEN='pk_804071b2ebec8b37c022aff6d1961'
const CLOUDPAYMENTS_TEST_TOKEN='pk_15732f58701e01bbff1459cfeb9bf'


const useCloudpayments = () => {
  const { userFullName } = useStore()
  const { userPhone } = useStore()
  const { userAddress } = useStore()
  const { userCity } = useStore()
  const { userZIP } = useStore()
  const { deliveryType } = useStore()
  const { boxberryData } = useStore()
  const address = deliveryType === 'Доставка до двери' ?
    userAddress
    :
    boxberryData ? boxberryData.address : 'Не выбран'
  const city = deliveryType === 'Доставка до двери' ?
    userCity
    :
    'Не выбран'
  const zip = deliveryType === 'Доставка до двери' ?
    userZIP
    :
    boxberryData?.zip

  const openCloudpayments = useCallback((props: openCloudpaymentsProps) => {
    const { cp } = window
    const {
      amount,
      description,
      onSuccess,
      onFail,
      onComplete
    } = props
    const widget = new cp.CloudPayments()
    widget.pay('charge', // или 'auth'
      { //options
        publicId: isProd() ?
          CLOUDPAYMENTS_TOKEN
          :
          CLOUDPAYMENTS_TEST_TOKEN,
        description,
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
          firstName: userFullName.split(' ')[1] || userFullName,
          lastName: userFullName.split(' ')[0] || userFullName,
          middleName: userFullName.split(' ')[2] || userFullName,
          birth: '1995-02-24',
          address: address,
          street: address,
          city: city,
          country: 'RU',
          phone: userPhone,
          postcode: zip
        }
      },
      {
        onSuccess,
        onFail,
        onComplete
      }
    )
  }, [
    userFullName,
    userPhone,
    userAddress,
    userCity,
    userZIP
  ])

  return openCloudpayments
}


export default useCloudpayments
