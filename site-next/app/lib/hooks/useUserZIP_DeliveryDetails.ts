import { useQuery } from '@tanstack/react-query'

import useStore from './useStore'
import useTotalPrice from './useTotalPrice'
import deliveryCalculation from '../utils/boxberry/deliveryCalculation'


export const useUserZIP_DeliveryDetails = () => {
  const totalPrice = useTotalPrice()
  const { userZIP } = useStore()

  return useQuery({
    queryKey: ['user-zip-delivery-price', userZIP],
    queryFn: async () => {
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
  })
}


export default useUserZIP_DeliveryDetails
