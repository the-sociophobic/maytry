import { CityByIPResponseType } from '../../types/requests.type'
import { post } from '../../utils/requests'


// const USER_CITY_FALLBACK = 'Санкт-Петербург'


const getUserCityByIP = async (ip: string | null) => {
  let userCityByIP: string | null = null

  try {
    const res = await post<CityByIPResponseType>('/city-by-ip', { ip })
    userCityByIP = res.city || null
  } catch (err) {
    console.log('getUserCityByIP error: ', getUserCityByIP)
  }

  // if (!userCityByIP) {
  //   userCityByIP = USER_CITY_FALLBACK
  //   console.log('userCityByIP: undefined. Using fallback: ', userCityByIP)
  // } else {
  //   console.log('userCityByIP: ', userCityByIP)
  // }
  console.log('userCityByIP: ', userCityByIP)

  return userCityByIP
}


export default getUserCityByIP
