import { FC } from 'react'

import useStore from '../hooks/useStore'
import useOrderCreate from '../hooks/useOrderCreate'
import CloudPaymentsButton from './CloudPaymentsButton'
import Button from './Button'


export type OrderCreateButtonProps = {
  disabled?: boolean
}


const OrderCreateButton: FC<OrderCreateButtonProps> = ({
  disabled
}) => {
  const { paymentType } = useStore()
  const orderCreate = useOrderCreate()

  return paymentType === 'Оплата при получении' ?
    <Button
      black
      disabled={disabled}
      onClick={orderCreate}
    >
      ЗАКАЗАТЬ
    </Button>
    :
    <CloudPaymentsButton
      disabled={disabled}
    />
}


export default OrderCreateButton
