import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import useTotalPrice from '../hooks/useTotalPrice'
import { printPrice } from '../utils/price'
import useDeliveryPrice from '../hooks/useDeliveryPrice'
import useOrderCreate from '../hooks/useOrderCreate'
import useCloudpayments from '../hooks/useCloudpayments'
import useProceedAfterAddressCheck from '../hooks/useProceedAfterAddressCheck'
import useStore from '../hooks/useStore'


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
  const { setIsLoading } = useStore()
  const { itemsInCart } = useStore()
  const itemsList = itemsInCart
    .map(item => `${item.name} (${item.color?.name} ${item.size.name}) × ${item.quantity}`)
    .join(', ')

  const onClick = () => {
    proceedAfterAddressCheck(async () => openCloudpayments({
      amount: totalPriceWithBoxberry,
      description: itemsList,
      onSuccess: (_options) => console.log('onSuccess', _options),
      onFail: () => {
        setIsLoading(false)
        navigate('/fail')
      },
      onComplete: async (_paymentResult: any, _options: any) => {
        if (_paymentResult.success) {
          await orderCreate()
          setIsLoading(false)
        }
        console.log('onComplete', _paymentResult, _options)
      },
    }))
  }

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
