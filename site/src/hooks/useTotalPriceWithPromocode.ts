import useStore from './useStore'
import useTotalPrice from './useTotalPrice'
import {
  calculateItemSubtotalPriceWithPromocode,
} from '../utils/price'


const useTotalPriceWithPromocode = () => {
  const totalPrice = useTotalPrice()
  const { currentPromocode } = useStore()
  const { itemsInCart } = useStore()
  let totalPriceWithPromocode = totalPrice

  if (currentPromocode) {
    if (currentPromocode.items) {
      totalPriceWithPromocode = itemsInCart
        .map(itemInCart =>
          calculateItemSubtotalPriceWithPromocode(itemInCart, currentPromocode))
        .reduce((a, b) => a + b)
    }
  }

  return totalPriceWithPromocode
}


export default useTotalPriceWithPromocode
