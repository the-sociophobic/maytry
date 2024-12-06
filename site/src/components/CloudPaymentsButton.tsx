import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import useTotalPrice from '../hooks/useTotalPrice'
import { printPrice } from '../utils/price'
import useDeliveryPrice from '../hooks/useDeliveryPrice'
import useOrderCreate from '../hooks/useOrderCreate'
import useCloudpayments from '../hooks/useCloudpayments'


export type CloudPaymentsButtonProps = {
  disabled?: boolean
}


const CloudPaymentsButton: FC<CloudPaymentsButtonProps> = ({
  disabled
}) => {
  const totalPrice = useTotalPrice()
  const deliveryPrice = useDeliveryPrice()
  const totalPriceWithBoxberry = totalPrice + deliveryPrice

  const orderCreate = useOrderCreate()

  const navigate = useNavigate()

  const openCloudpayments = useCloudpayments()

  return (
    <Button
      black
      disabled={disabled}
      onClick={() =>
        openCloudpayments({
          amount: totalPriceWithBoxberry,
          // onSuccess: orderCreate,
          onSuccess: (_options) => console.log('onSuccess', _options),
          onFail: () => {
            navigate('/fail')
          },
          onComplete: (_paymentResult: any, _options: any) => {
            if (_paymentResult.success)
              orderCreate()
            console.log('onComplete', _paymentResult, _options)
          },
        })
      }
    >
      ОПЛАТИТЬ {printPrice(totalPriceWithBoxberry)}
    </Button>
  )
}


export default CloudPaymentsButton
