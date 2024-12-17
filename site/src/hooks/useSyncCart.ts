import useContentful from './useContentful'
import useStore from './useStore'


const useSyncCart = () => {
  const { data: contentful } = useContentful()
  const { itemsInCart } = useStore()
  const { setItemInCart } = useStore()

  const syncCart = () => {
    if (!contentful)
      return
    
    const { items } = contentful

    itemsInCart.forEach(itemInCart => {
      const item = items.find(item => item.name === itemInCart.name)
      if (!item) {
        setItemInCart(itemInCart, 0)
        return
      }

      const c_p_s = item.color_price_size?.find(c_p_s => c_p_s.id === itemInCart.id)
      if (!c_p_s) {
        setItemInCart(itemInCart, 0)
        return
      }

      if (c_p_s.max_available < itemInCart.quantity)
        setItemInCart(itemInCart, c_p_s.max_available)
    })
  }

  return syncCart
}


export default useSyncCart
