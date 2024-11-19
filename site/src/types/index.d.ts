import { BoxberryDataType } from './boxberry.type'

export {};

declare global {
  interface Window {
    boxberry: {
      openOnPage: (id: string) => void
      open: (
        callback_function: (result: BoxberryDataType) => void,
        api_token?: string,
        custom_city?: string,
        target_start?: string, // Код пункта приема посылок
        ordersum?: number, // Объявленная стоимость посылки
        weight?: number | number[], // Вес посылки в граммах, обязательно должен быть > 0
        paysum?: number, // Сумма к оплате покупателем (оплата при получении)
        height?: number, // Высота коробки
        width?: number, // Ширина коробки
        depth?: number, // Глубина коробки
        depth2?: number, // ???
      ) => void
    }
    ymaps3?: any
    ym?: (
      YANDEX_METRICA_ID: number,
      actionName: string,
      TARGET_NAME: number,
      options?: {
        order_price: number,
        currency: string
      }
    ) => void
    cp?: any & {
      CloudPayments: () => any
    }
    Telegram?: any & {
      WebApp: any & {
        initData: String
        sendData: (data: any) => void
        expand: () => void
        close: () => void
        BackButton: any & {
          onClick: (fn: () => void) => void
          hide: () => void
        }
      }
    }
  }
}
