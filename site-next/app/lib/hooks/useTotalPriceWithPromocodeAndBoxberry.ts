import useDeliveryPrice from './useDeliveryPrice'
import useTotalPriceWithPromocode from './useTotalPriceWithPromocode'


const useTotalPriceWithPromocodeAndBoxberry = () => {
  const deliveryPrice = useDeliveryPrice()
  const totalPriceWithPromocode = useTotalPriceWithPromocode()

  return totalPriceWithPromocode + deliveryPrice
}

export default useTotalPriceWithPromocodeAndBoxberry
