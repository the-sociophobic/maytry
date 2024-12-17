import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import useTotalPrice from '../hooks/useTotalPrice'
import { printPrice } from '../utils/price'
import useDeliveryPrice from '../hooks/useDeliveryPrice'
import useOrderCreate from '../hooks/useOrderCreate'
import useCloudpayments from '../hooks/useCloudpayments'
import useProceedAfterAddressCheck from '../hooks/useProceedAfterAddressCheck'


export type CloudPaymentsButtonProps = {
  disabled?: boolean
}


const CloudPaymentsButton: FC<CloudPaymentsButtonProps> = ({
  disabled
}) => {
  const totalPrice = useTotalPrice()
  const deliveryPrice = useDeliveryPrice()
  const totalPriceWithBoxberry = totalPrice + deliveryPrice

  const proceedAfterAddressCheck = useProceedAfterAddressCheck()
  const orderCreate = useOrderCreate()
  const navigate = useNavigate()
  const openCloudpayments = useCloudpayments()

  const onClick = () => proceedAfterAddressCheck(() => openCloudpayments({
    amount: totalPriceWithBoxberry,
    onSuccess: (_options) => console.log('onSuccess', _options),
    onFail: () => navigate('/fail'),
    onComplete: (_paymentResult: any, _options: any) => {
      if (_paymentResult.success)
        orderCreate()
      console.log('onComplete', _paymentResult, _options)
    },
  }))

  return (
    <Button
      black
      disabled={disabled}
      onClick={onClick}
    >
      ОПЛАТИТЬ {printPrice(totalPriceWithBoxberry)}
    </Button>
  )
}


export default CloudPaymentsButton
