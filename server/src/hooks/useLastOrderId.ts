import delay from '../utils/delay'
import storage from '../units/storage'


const { BOXBERRY_INITIAL_ORDER_ID } = process.env


const useLastOrderId = async () => {
  let orders = storage.read('boxberry-order-id.json') as { last_order_id: number } | undefined
  let last_order_id: string | number | undefined
  console.log(orders)
  if (!orders) {
    last_order_id = parseInt(BOXBERRY_INITIAL_ORDER_ID)
    orders = { last_order_id }
    await storage.write('boxberry-order-id.json', orders)
  } else {
    last_order_id = parseInt(orders.last_order_id + '')
  }

  return last_order_id
}


export default useLastOrderId


export const incrementLastOrderId = async (incrementValue: number = 1) => {
  const last_order_id = await useLastOrderId()
  const updated_order_id = last_order_id + incrementValue
  const orders = { last_order_id: updated_order_id }

  await storage.write('boxberry-order-id.json', orders)

  await delay()
}
