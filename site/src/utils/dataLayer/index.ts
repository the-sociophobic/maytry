import { ItemInCartType } from '../../types/site.type'
import { calculateItemsPrice } from '../price'
import {
  DataLayerActionType,
  DataLayerYandexProductFieldObjectType,
  DataLayerYandexProps
} from './Types'


export type DataLayerProps = {
  actionType: DataLayerActionType
  items: ItemInCartType[]
}

const VK_ID = 3609099

const dataLayer = ({ actionType, items }: DataLayerProps) => {
  // Yandex
  if (!window.dataLayerYandex)
    window.dataLayerYandex = window.dataLayerYandex || []

  const { dataLayerYandex } = window
  const mappedItems = items.map((item): DataLayerYandexProductFieldObjectType => ({
    id: item.link,
    name: item.name,
    category: item.categories[0]?.name || '', // TODO
    price: item.price,
    quantity: item.quantity,
    variant: `${item.color ? `${item.color?.name} ` : ''}${item.size.name}`,
  }))

  dataLayerYandex.push({
    ecommerce: {
      currencyCode: 'RUB',
      [actionType as string]: {
        actionField: { id: '' },
        products: mappedItems,
        promotions: []
      }
    }
  } as DataLayerYandexProps)


  // VK
  if (!window.dataLayerVK)
    window.dataLayerVK = window.dataLayerVK || []

  const { dataLayerVK } = window
  const { _tmr } = window

  _tmr.push({
    type: 'reachGoal',
    id: VK_ID,
    value: calculateItemsPrice(items),
    goal: actionType,
    params: { product_id: items[0].link } // TODO
  })
  dataLayerVK.push({
    type: 'reachGoal',
    id: VK_ID,
    value: calculateItemsPrice(items),
    goal: actionType,
    params: { product_id: items[0].link } // TODO
  })
}


export default dataLayer
