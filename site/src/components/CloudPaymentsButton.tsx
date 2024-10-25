import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import useStore from '../hooks/useStore'
import Button from '../components/Button'
import openCloudpayments from '../utils/openCloudpayments'
import useTotalPrice from '../hooks/useTotalPrice'
import { printPrice } from '../utils/price'
import postToBoxberry from '../utils/postToBoxberry'
import useDeliveryPrice from '../hooks/useDeliveryPrice'


export type CloudPaymentsButtonProps = {
  disabled?: boolean
}


const CloudPaymentsButton: FC<CloudPaymentsButtonProps> = ({
  disabled
}) => {
  const { boxberryData } = useStore()
  const { setBoxberryData } = useStore()
  const { emptyCart } = useStore()

  const totalPrice = useTotalPrice()
  const deliveryPrice = useDeliveryPrice()
  const totalPriceWithBoxberry = totalPrice + deliveryPrice

  const navigate = useNavigate()

  const { userFullName } = useStore()
  const { userPhone } = useStore()
  const { userEmail } = useStore()

  return (
    <Button
      black
      disabled={!boxberryData || disabled}
      onClick={() =>
        openCloudpayments({
          amount: totalPriceWithBoxberry,
          onSuccess: () => {
            postToBoxberry({
              order_id: '1',

              price: totalPrice,
              payment_sum: totalPriceWithBoxberry,
              delivery_sum: totalPriceWithBoxberry - totalPrice,

              pvz_number: boxberryData?.id || '',

              fio: userFullName,
              phone: userPhone,
              email: userEmail,

              items: [],
            })
            emptyCart()
            setBoxberryData(undefined)
            navigate('/success')
          },
          onFail: () => {
            navigate('/fail')
          },
          onComplete: () => { },
        })
      }
    >
      ОПЛАТИТЬ {printPrice(totalPriceWithBoxberry)}
    </Button>
  )
}


export default CloudPaymentsButton
