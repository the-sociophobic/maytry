// import { useMemo } from 'react'

import useStore from './useStore'
// import useUserZIP_DeliveryPrice from './useUserZIP_DeliveryPrice'
import useTotalPrice from './useTotalPrice'


const useDeliveryPrice = () => {
  const totalPrice = useTotalPrice()
  const { deliveryType } = useStore()

  return totalPrice > 6000 ? 0 : deliveryType === 'Доставка до двери' ? 300 : 200
  
  // const { boxberryData } = useStore()
  // const userZIP_DeliveryPrice = useUserZIP_DeliveryPrice()
  // const deliveryPrice = useMemo(() =>
  //   deliveryType === 'Пункт выдачи Boxberry' ?
  //     parseInt(boxberryData?.price || '0')
  //     :
  //     userZIP_DeliveryPrice === undefined ? -1 : userZIP_DeliveryPrice
  //   , [deliveryType, boxberryData, userZIP_DeliveryPrice])

  // return deliveryPrice
}


export default useDeliveryPrice
