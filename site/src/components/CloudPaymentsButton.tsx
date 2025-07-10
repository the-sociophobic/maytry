import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import { printPrice } from '../utils/price'
import useOrderCreate from '../hooks/useOrderCreate'
import useCloudpayments from '../hooks/useCloudpayments'
import useProceedAfterAddressCheck from '../hooks/useProceedAfterAddressCheck'
import useStore from '../hooks/useStore'
import useTotalPriceWithPromocodeAndBoxberry from '../hooks/useTotalPriceWithPromocodeAndBoxberry'


export type CloudPaymentsButtonProps = {
  disabled?: boolean
  price?: number
}


const CloudPaymentsButton: FC<CloudPaymentsButtonProps> = ({
  disabled,
  price
}) => {
  const totalPriceWithPromocodeAndBoxberry = useTotalPriceWithPromocodeAndBoxberry()

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
      amount: price !== undefined ? price : totalPriceWithPromocodeAndBoxberry,
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
      ОПЛАТИТЬ {printPrice(price !== undefined ? price : totalPriceWithPromocodeAndBoxberry)}
    </Button>
  )
}


export default CloudPaymentsButton
