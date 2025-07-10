import useUserZIP_DeliveryDetails from './useUserZIP_DeliveryDetails'


const useUserZIP_DeliveryPrice = () => {
  const { data: deliveryDetails } = useUserZIP_DeliveryDetails()

  return !deliveryDetails ? 0 :
    deliveryDetails.error ?
      -1
      :
      Math.ceil(parseFloat(deliveryDetails.result?.DeliveryCosts[0]?.TotalPrice + '')) || -1
}


export default useUserZIP_DeliveryPrice
