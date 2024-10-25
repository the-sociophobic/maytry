import useStore from './useStore'


const useDeliveryPrice = () => {
  const { boxberryData } = useStore()
  const deliveryPrice = parseInt(boxberryData?.price || '0')
  
  return deliveryPrice
}


export default useDeliveryPrice
