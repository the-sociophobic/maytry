import useStore from './useStore'
import useTotalPrice from './useTotalPrice'
// import useUserZIP_DeliveryDetails from './useUserZIP_DeliveryDetails'


const useUserZIP_DeliveryPrice = () => {
  // const { data: deliveryDetails } = useUserZIP_DeliveryDetails()
  const price = useTotalPrice()
  const { deliveryType } = useStore()

  // return !deliveryDetails ? 0 :
  //   deliveryDetails.error ?
  //     -1
  //     :
  //     Math.ceil(parseFloat(deliveryDetails.result?.DeliveryCosts[0]?.TotalPrice + '')) || -1
  return price >= 6000 ?
    0
    :
    deliveryType === 'Доставка до двери' ? 300 : 200
}


export default useUserZIP_DeliveryPrice
