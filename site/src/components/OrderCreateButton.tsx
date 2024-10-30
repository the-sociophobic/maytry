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
  const { boxberryData } = useStore()
  const _disabled= !boxberryData || disabled
  const orderCreate = useOrderCreate()
  
  return paymentType === 'Оплата онлайн' ?
    <CloudPaymentsButton
      disabled={_disabled}
    />
    :
    <Button
      black
      disabled={_disabled}
      onClick={orderCreate}
    >
      ЗАКАЗАТЬ
    </Button>
}


export default OrderCreateButton
