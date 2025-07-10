import { ContentfulPromocodeType } from '../../types/contentful.type'
import { ItemInCartType } from '../../types/site.type'
import { calculateItemSubtotalPriceWithPromocode } from '../price'
import {
  DataLayerActionType,
  DataLayerVKProps,
  DataLayerYandexProductFieldObjectType,
  DataLayerYandexProps
} from './Types'


export type DataLayerProps = {
  actionType: DataLayerActionType
  items: ItemInCartType[]
  promocode?: ContentfulPromocodeType
  orderId?: string
}

const VK_ID = 3609099

const dataLayer = ({
  actionType,
  items,
  promocode,
  orderId
}: DataLayerProps) => {
  const recent_action = localStorage.getItem('recent_action')
  const recent_action_timestamp = localStorage.getItem('recent_action_timestamp') || '0'
  const currentTimestamp = (new Date()).getTime()

  if (recent_action === actionType && currentTimestamp - parseInt(recent_action_timestamp) < 50)
    return

  localStorage.setItem('recent_action', actionType)
  localStorage.setItem('recent_action_timestamp', currentTimestamp + '')


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
    category: item.categories?.[0]?.name || '', // TODO
    price: itemPrice(item),
    quantity: item.quantity,
    variant: `${item.color ? `${item.color?.name} ` : ''}${item.size.name}`,
  }))
  const ecommerce = {
    currencyCode: 'RUB',
    [actionType as string]: {
      actionField: { id: orderId || '' },
      products: mappedItems,
      promotions: promocode ? [{ id: promocode.id }] : []
    }
  }
  dataLayerYandex.push({ ecommerce } as DataLayerYandexProps)


  // VK
  const { _tmr } = window

  items.forEach(item => {
    for (let i = 0; i < item.quantity; i++) {
      const vk_data: DataLayerVKProps = {
        type: 'reachGoal',
        id: VK_ID,
        value: itemPrice(item),
        goal: actionType,
        params: { product_id: item.link }
      }

      _tmr.push(vk_data)
    }
  })

  console.log(`Ecommerce метка ${actionType} (${actionTypeVocabulary[actionType]})`, ecommerce)
}


export default dataLayer


const actionTypeVocabulary = {
  'add': 'добавление товара в корзину',
  'purchase': 'покупка',
  'impressions': 'просмотр списка товаров',
  'click': 'клик по товару в списке',
  'detail': 'просмотр товара',
  'remove': 'удаление товара из корзины',
}
