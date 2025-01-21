import useStore from './useStore'
import useTotalPrice from './useTotalPrice'


const useTotalPriceWithPromocode = () => {
  const totalPrice = useTotalPrice()
  const { currentPromocode } = useStore()
  let totalPriceWithPromocode = totalPrice

  if (currentPromocode) {
    if (currentPromocode.type) {
      totalPriceWithPromocode *= (1 - (currentPromocode.amount / 100))
    } else {
      totalPriceWithPromocode -= currentPromocode.amount
    }
  }

  return totalPriceWithPromocode
}


export default useTotalPriceWithPromocode
