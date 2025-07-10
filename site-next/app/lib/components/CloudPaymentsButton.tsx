'use client'
 
import { FC } from 'react'
import { useRouter } from 'next/navigation'

import Button from '../components/Button'
import { printPrice } from '../utils/price'
import useOrderCreate from '../hooks/useOrderCreate'
import useCloudpayments from '../hooks/useCloudpayments'
import useProceedAfterAddressCheck from '../hooks/useProceedAfterAddressCheck'
import useStore from '../hooks/useStore'
import useTotalPriceWithPromocodeAndBoxberry from '../hooks/useTotalPriceWithPromocodeAndBoxberry'


export type CloudPaymentsButtonProps = {
  disabled?: boolean
}


const CloudPaymentsButton: FC<CloudPaymentsButtonProps> = ({
  disabled
}) => {
  const totalPriceWithPromocodeAndBoxberry = useTotalPriceWithPromocodeAndBoxberry()

  const proceedAfterAddressCheck = useProceedAfterAddressCheck()
  const orderCreate = useOrderCreate()
  const router = useRouter()
  const openCloudpayments = useCloudpayments()
  const { setIsLoading } = useStore()
  const { itemsInCart } = useStore()
  const itemsList = itemsInCart
    .map(item => `${item.name} (${item.color?.name} ${item.size.name}) × ${item.quantity}`)
    .join(', ')

  const onClick = () => {
    proceedAfterAddressCheck(async () => openCloudpayments({
      amount: totalPriceWithPromocodeAndBoxberry,
      description: itemsList,
      onSuccess: (_options) => console.log('onSuccess', _options),
      onFail: () => {
        setIsLoading(false)
        router.push('/fail')
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
      ОПЛАТИТЬ {printPrice(totalPriceWithPromocodeAndBoxberry)}
    </Button>
  )
}


export default CloudPaymentsButton
