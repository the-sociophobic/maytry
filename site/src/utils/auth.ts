const mockInitData = 'user%3D%257B%2522id%2522%253A55439398%252C%2522first_name%2522%253A%2522LEF%2522%252C%2522last_name%2522%253A%2522VASILYEV%2522%252C%2522username%2522%253A%2522the_sociophobic%2522%257D%26hash%3D8885bafa5d3204428fd53bfa86583ac1551b5a87afbd50b168fad5944ecc32b5'
const getAuthStringFromWebApp = () => window.Telegram?.WebApp?.initData || mockInitData
const isWebApp = () => !!getAuthStringFromWebApp()

export type WebAppAuthObject = {
  id?: string
  first_name?: string
  last_name?: string
  username?: string
  hash?: string
  photo_url?: string
  [key: string]: string | undefined
}
const getWebAppAuthObject = (): WebAppAuthObject | undefined =>
  !isWebApp() ?
    undefined
    :
    JSON.parse(
      Object.fromEntries(new URLSearchParams(decodeURIComponent(getAuthStringFromWebApp())))
        .user
    )


export {
  getAuthStringFromWebApp,
  getWebAppAuthObject,
}
