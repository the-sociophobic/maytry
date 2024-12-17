import { FC } from 'react'

import useStore from '../hooks/useStore'
import useOrderCreate from '../hooks/useOrderCreate'
import CloudPaymentsButton from './CloudPaymentsButton'
import Button from './Button'
import useProceedAfterAddressCheck from '../hooks/useProceedAfterAddressCheck'


export type OrderCreateButtonProps = {
  disabled?: boolean
}


const OrderCreateButton: FC<OrderCreateButtonProps> = ({
  disabled
}) => {
  const { paymentType } = useStore()
  const orderCreate = useOrderCreate()
  const proceedAfterAddressCheck = useProceedAfterAddressCheck()
  const { setIsLoading } = useStore()

  return paymentType === 'Оплата при получении' ?
    <Button
      black
      disabled={disabled}
      onClick={async () => {
        setIsLoading(true)
        await proceedAfterAddressCheck(orderCreate)
        setIsLoading(false)
      }}
    >
      ЗАКАЗАТЬ
    </Button>
    :
    <CloudPaymentsButton
      disabled={disabled}
    />
}


export default OrderCreateButton
