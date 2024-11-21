import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import useStore from '../hooks/useStore'
import Button from '../components/Button'
// import openCloudpayments from '../utils/openCloudpayments'
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
  const { boxberryData } = useStore()

  const totalPrice = useTotalPrice()
  const deliveryPrice = useDeliveryPrice()
  const totalPriceWithBoxberry = totalPrice + deliveryPrice

  const orderCreate = useOrderCreate()

  const navigate = useNavigate()

  const openCloudpayments = useCloudpayments()

  return (
    <Button
      black
      disabled={!boxberryData || disabled}
      onClick={() =>
        openCloudpayments({
          amount: totalPriceWithBoxberry,
          onSuccess: orderCreate,
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
