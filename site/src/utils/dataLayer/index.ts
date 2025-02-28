import { ContentfulPromocodeType } from '../../types/contentful.type'
import { ItemInCartType } from '../../types/site.type'
import { calculateItemSubtotalPriceWithPromocode } from '../price'
import {
  DataLayerActionType,
  DataLayerYandexProductFieldObjectType,
  DataLayerYandexProps
} from './Types'


export type DataLayerProps = {
  actionType: DataLayerActionType
  items: ItemInCartType[]
  promocode?: ContentfulPromocodeType
}

const VK_ID = 3609099

const dataLayer = ({
  actionType,
  items,
  promocode
}: DataLayerProps) => {
  const itemPrice = (item: ItemInCartType) =>
    (promocode && actionType === 'purchase') ?
      calculateItemSubtotalPriceWithPromocode(item, promocode) / item.quantity
      :
      item.price

  // Yandex
  if (!window.dataLayerYandex)
    window.dataLayerYandex = window.dataLayerYandex || []

  const { dataLayerYandex } = window
  const mappedItems = items.map((item): DataLayerYandexProductFieldObjectType => ({
    id: item.link,
    name: item.name,
    category: item.categories[0]?.name || '', // TODO
    price: itemPrice(item),
    quantity: item.quantity,
    variant: `${item.color ? `${item.color?.name} ` : ''}${item.size.name}`,
  }))

  dataLayerYandex.push({
    ecommerce: {
      currencyCode: 'RUB',
      [actionType as string]: {
        actionField: { id: '' },
        products: mappedItems,
        promotions: promocode ? [{ id: promocode.id }] : []
      }
    }
  } as DataLayerYandexProps)


  // VK
  const { _tmr } = window

  items.forEach(item => {
    for (let i = 0; i < item.quantity; i++) {
      _tmr.push({
        type: 'reachGoal',
        id: VK_ID,
        value: itemPrice(item),
        goal: actionType,
        params: { product_id: item.link }
      })
    }
  })
}


export default dataLayer
