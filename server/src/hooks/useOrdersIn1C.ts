import storage from '../units/storage'


const useOrdersIn1C = () => {
  const { orders } = storage
    .read<{ orders: string[] }>('orders-in-1C.json')
    ||
    ({ orders: [] })

  return orders
}


export default useOrdersIn1C
