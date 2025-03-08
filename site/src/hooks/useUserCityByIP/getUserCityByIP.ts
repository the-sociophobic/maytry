import { get } from '../../utils/requests'


const LOCATION_PROVIDER_URL = 'https://ipapi.co/'


const getUserCityByIP = async () => {
  let res: GetUserLocationResultType | undefined
  const user_ip = ''
  
  try {
    res = await get<GetUserLocationResultType>(LOCATION_PROVIDER_URL + user_ip + '/json/')
  } catch (err: any) {
    console.log('getUserCityByIPError: ', err)
  }

  return res?.city || 'Санкт-Петербург'
}


export default getUserCityByIP


export type GetUserLocationResultType = {
  asn: string
  city: string
  continent_code: string
  country: string
  country_area: number
  country_calling_code: string
  country_capital: string
  country_code: string
  country_code_iso3: string
  country_name: string
  country_population: number
  country_tld: string
  currency: string
  currency_name: string
  in_eu:false
  ip: string
  languages: string
  latitude: number
  longitude: number
  network: string
  org: string
  postal: string
  region: string
  region_code: string
  timezone: string
  utc_offset: string
  version: string
}
