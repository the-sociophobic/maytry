export {};

declare global {
  interface Window {
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