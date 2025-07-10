import { FC } from 'react'

import useStore from '../hooks/useStore'
import useOrderCreate from '../hooks/useOrderCreate'
import CloudPaymentsButton from './CloudPaymentsButton'
import Button from './Button'
import useProceedAfterAddressCheck from '../hooks/useProceedAfterAddressCheck'
import { printPrice } from '../utils/price'

interface OrderCreateButtonProps {
  disabled: boolean
  onClick?: () => void | Promise<void>
  price?: number
}

const OrderCreateButton: FC<OrderCreateButtonProps> = ({
  disabled,
  onClick,
  price
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
        if (onClick) {
          await proceedAfterAddressCheck(onClick)
        } else {
          await proceedAfterAddressCheck(orderCreate)
        }
        setIsLoading(false)
      }}
    >
      ОПЛАТИТЬ {price !== undefined ? printPrice(price) : '—'}
    </Button>
    :
    <CloudPaymentsButton
      disabled={disabled}
      price={price}
    />
}

export default OrderCreateButton
