import useTotalPrice from './useTotalPrice'
import deliveryCalculation from '../utils/boxberry/deliveryCalculation'


const useAddressCheck = () => {
  const totalPrice = useTotalPrice()

  const addressCheck = async (zip: string) => {
    const res = await deliveryCalculation({
      OrderSum: totalPrice,
      PaySum: totalPrice + 300,
      DeliverySum: 300,
      Zip: zip
    })

    return res
  }

  return addressCheck
}


export default useAddressCheck
