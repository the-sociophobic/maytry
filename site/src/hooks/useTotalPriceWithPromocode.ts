import useStore from './useStore'
import useTotalPrice from './useTotalPrice'
import {
  calculateItemSubtotalPrice,
  calculatePromocodePrice
} from '../utils/price'


const useTotalPriceWithPromocode = () => {
  const totalPrice = useTotalPrice()
  const { currentPromocode } = useStore()
  const { itemsInCart } = useStore()
  let totalPriceWithPromocode = totalPrice

  if (currentPromocode) {
    if (currentPromocode.items) {
      totalPriceWithPromocode = itemsInCart
        .map(itemInCart => {
          const itemInCartInPromocode = currentPromocode.items!
            .find(promocodeItem => promocodeItem.link === itemInCart.link)
          const itemInCartIsOnSale = !!itemInCartInPromocode
          const itemInCartPrice = calculateItemSubtotalPrice(itemInCart)
          const itemInCartSalePrice = itemInCartIsOnSale ?
            calculatePromocodePrice(itemInCartPrice, currentPromocode)
            :
            itemInCartPrice

          return itemInCartSalePrice
        })
        .reduce((a, b) => a + b)
    }
  }

  return totalPriceWithPromocode
}


export default useTotalPriceWithPromocode
