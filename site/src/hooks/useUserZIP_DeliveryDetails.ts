import { useQuery } from 'react-query'

import useStore from './useStore'
import useTotalPrice from './useTotalPrice'
import deliveryCalculation from '../utils/boxberry/deliveryCalculation'


export const useUserZIP_DeliveryDetails = () => {
  const totalPrice = useTotalPrice()
  const { userZIP } = useStore()

  return useQuery({
    queryKey: ['user-zip-delivery-price', userZIP, totalPrice],
    queryFn: () => getUserZIP_DeliveryDetails(userZIP, totalPrice),
    initialData: UserZIP_DeliveryDetailsFallback,
  })
}


export default useUserZIP_DeliveryDetails


const getUserZIP_DeliveryDetails = async (userZIP: string, totalPrice: number) => {
  return userZIP.length === 6 ?
    await deliveryCalculation({
      OrderSum: totalPrice,
      PaySum: totalPrice + 300,
      DeliverySum: 300,
      Zip: userZIP
    })
    :
    await Promise.resolve({
      error: true,
      message: 'Неправильный почтовый индекс',
      result: { DeliveryCosts: [] }
    })
}


const UserZIP_DeliveryDetailsFallback = {
  error: true,
  message: 'Неправильный почтовый индекс',
  result: { DeliveryCosts: [] }
}