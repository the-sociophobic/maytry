import { Request, Response } from 'express'
import axios from 'axios'

import {
  CityByIPRequestType,
  CityByIPResponseType,
  GetUserLocationResultType,
  ResponseErrorType
} from '../types/requests.type'


const LOCATION_PROVIDER_URL = 'https://ipapi.co/'


const CityByIP = async (
  request: Request<{}, {}, CityByIPRequestType>,
  response: Response<CityByIPResponseType | ResponseErrorType>
) => {
  const { body: { ip } } = request
  let userCityByIP: string | undefined

  if (ip) {
    let res: GetUserLocationResultType | undefined
  
    try {
      res = (await axios.get<GetUserLocationResultType>(LOCATION_PROVIDER_URL + ip + '/json/')).data
    } catch (err: any) {
      console.log('getUserCityByIPError: ', err)
    }

    if (res)
      userCityByIP = res?.city
  }

  response.send({ city: userCityByIP })
}


export default CityByIP
