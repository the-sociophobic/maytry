import { BoxberryResultType } from '../components/Boxberry'

export {};

declare global {
  interface Window {
    boxberry: any & {
      openOnPage: (id: string) => void
      open: (callback_function: (result: BoxberryResultType) => void) => void
    }
    ymaps3?: any
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
