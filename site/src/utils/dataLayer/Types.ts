export type DataLayerActionType =
 | 'add'
 | 'purchase'
//  | 'impressions'
//  | 'click'
//  | 'detail'
 | 'remove'
//  | 'promoView'
//  | 'promoClick'


// https://yandex.ru/support/metrica/ecommerce/data.html#data
export type DataLayerYandexProps = {
  ecommerce: {
    currencyCode?: 'RUB'
  } & {
    [actionType: string]: {
      actionField?: object
      products: DataLayerYandexProductFieldObjectType[]
      promotions: DataLayerYandexPromoFieldObjectType[]
    }
  }
}

export enum DataLayerYandexActionType {
  ADD = 'add',
  PURCHASE = 'purchase'
}

// https://yandex.ru/support/metrica/ecommerce/data.html#about__product_data
export type DataLayerYandexProductFieldObjectType = {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  variant: string
}

// https://yandex.ru/support/metrica/ecommerce/data.html#about__promo_data
export type DataLayerYandexPromoFieldObjectType = {
  id: string
}


// https://ads.vk.com/hq/pixels/3609099/events/upsert?sudo=vkads_608174788%40vk%403409886
export type DataLayerVKProps = {
  type: 'reachGoal'
  id: number // VK id
  value: number // price
  goal: DataLayerVKActionType
  params: { product_id: string }
}

export type DataLayerVKActionType = DataLayerActionType
