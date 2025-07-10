import useContentful from '../useContentful'
import use1C from '../../hooks/use1C'
import useOrders from '../../hooks/useOrders'
import combineItems from './combineItems'
import storage from '../../units/storage'
import { CombinedItemType } from '../../types/contentful.type'
import { OrderType } from '../../types/boxberry.type'
import useOrdersIn1C from '../../hooks/useOrdersIn1C'


const useCombinedData = async () => {
  const local_combined_items = storage.read<CombinedItemType[]>('combined.json')
  const contentful = await useContentful()
  let items: CombinedItemType[] = []

  if (local_combined_items)
    items = local_combined_items
  else {
    const { items_from_1C } = await use1C()
    const downloaded_items = await combineItems(contentful, items_from_1C)
  
    await storage.write('combined.json', downloaded_items)

    items = downloaded_items
  }

  const orders = useOrders()
  const ordesIn1C = useOrdersIn1C()
  const ordersNotIn1C = orders.filter(order => !ordesIn1C.includes(order.order_id))
  const itemsWithOrders = substractOrders(items, ordersNotIn1C)

  return ({
    ...contentful,
    items: itemsWithOrders
  })
}


const substractOrders = (items: CombinedItemType[], orders: OrderType[]) => {
  const resultItems = items.map(item => ({
    ...item,
    color_price_size: item.color_price_size.map(c_p_s => {
      const boughtQuantity = orders.flatMap(order =>
        order.items.map(boughtItem =>
          // boughtItem.color?.id === c_p_s.color?.id && boughtItem.size?.id === c_p_s.size?.id ?
          boughtItem.id === c_p_s.id ?
            boughtItem.quantity
            :
            0
          )
      ).reduce((a, b) => a + b, 0)

      return ({
        ...c_p_s,
        max_available: c_p_s.max_available - boughtQuantity
      })
    })
  }))

  return resultItems
}


export default useCombinedData
