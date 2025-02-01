import { calculateItemSubtotalPrice } from '../utils/price'
import useStore from './useStore'


const useTotalPrice = () => {
  const { itemsInCart } = useStore()
  const totalPrice = itemsInCart
    .map(item => calculateItemSubtotalPrice(item))
    .reduce((a, b) => a + b, 0)

  return totalPrice
}


export default useTotalPrice