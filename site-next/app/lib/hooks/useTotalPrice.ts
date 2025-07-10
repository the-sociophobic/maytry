import { calculateItemsPrice } from '../utils/price'
import useStore from './useStore'


const useTotalPrice = () => {
  const { itemsInCart } = useStore()
  const totalPrice = calculateItemsPrice(itemsInCart)

  return totalPrice
}


export default useTotalPrice