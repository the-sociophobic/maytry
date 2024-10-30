import { useMemo } from 'react'

import useStore from './useStore'
import useUserZIP_DeliveryPrice from './useUserZIP_DeliveryPrice'


const useDeliveryPrice = () => {
  const { deliveryType } = useStore()
  const { boxberryData } = useStore()
  const userZIP_DeliveryPrice = useUserZIP_DeliveryPrice()

  const deliveryPrice = useMemo(() =>
    deliveryType === 'Пункт выдачи Boxberry' ?
      parseInt(boxberryData?.price || '0')
      :
      userZIP_DeliveryPrice || -1
    , [deliveryType, boxberryData, userZIP_DeliveryPrice])

  return deliveryPrice
}


export default useDeliveryPrice
