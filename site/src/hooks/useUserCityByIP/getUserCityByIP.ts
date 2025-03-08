import { CityByIPResponseType } from '../../types/requests.type'
import { post } from '../../utils/requests'


// const USER_CITY_FALLBACK = 'Санкт-Петербург'


const getUserCityByIP = async (ip: string | undefined) => {
  let userCityByIP: string | undefined

  try {
    const res = await post<CityByIPResponseType>('/city-by-ip', { ip })
    userCityByIP = res.city
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
