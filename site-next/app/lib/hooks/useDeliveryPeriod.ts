import useStore from './useStore'
// import useUserZIP_DeliveryDetails from './useUserZIP_DeliveryDetails'


const useDeliveryPeriod = () => {
  // const { data: deliveryDetails } = useUserZIP_DeliveryDetails()
  const { boxberryData } = useStore()
  const { deliveryType } = useStore()
  const deliveryPeriod = deliveryType === 'Доставка до двери' ?
    // deliveryDetails?.result?.DeliveryCosts[0]?.DeliveryPeriod
    7
    :
    boxberryData?.period && parseInt(boxberryData?.period)

  return deliveryPeriod ? deliveryPeriod + 3 : 14
}


export default useDeliveryPeriod
