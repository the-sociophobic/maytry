import useStore from './useStore'


const useTotalPrice = () => {
  const { itemsInCart } = useStore()
  const totalPrice = itemsInCart
    .map(item => (item.salePrice || item.price) * item.quantity)
    .reduce((a, b) => a + b, 0)

  return totalPrice
}


export default useTotalPrice
