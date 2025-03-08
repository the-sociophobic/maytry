import storage from '../units/storage'
import { OrderType } from '../types/boxberry.type'


const useOrders = () => {
  const orders = storage.read<OrderType[]>('orders.json') || []

  return orders
}


export default useOrders
