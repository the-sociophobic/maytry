import axios from 'axios'

import {
  DeliveryCalculationRequestType,
  DeliveryCalculationResponceType
} from '../../types/boxberry.type'


const deliveryCalculation = async (props: DeliveryCalculationRequestType) => {
  const res = (await axios.post<DeliveryCalculationResponceType>(
    'https://api.boxberry.ru/json.php',
    createDeliveryCalculationRequest(props)
  )).data

  // console.log('props', props)
  // console.log('res.result.DeliveryCosts', res)
  return res
}


export default deliveryCalculation


const {
  BOXBERRY_API_TOKEN,
  BOXBERRY_TARGET_START
} = process.env


const createDeliveryCalculationRequest = (props: DeliveryCalculationRequestType) => ({
  "token": BOXBERRY_API_TOKEN,
  "method": "DeliveryCalculation",
  // "SenderCityId": "68",
  // "RecipientCityId": "16",
  "DeliveryType": "2", // 2 - Курьерская доставка
  "TargetStart": BOXBERRY_TARGET_START,
  // "TargetStop": props.TargetStop,
  "OrderSum": props.OrderSum,
  "DeliverySum": props.DeliverySum,
  "PaySum": props.PaySum,
  "Zip": props.Zip,
  "BoxSizes": [
    {
      "Width": 30,
      "Height": 20,
      "Depth": 20,
      "Weight": 2000
    },
  ],
  "UseShopSettings": "1",
  // "CmsName": "Bitrix",
  // "Url": "site.ru",
  "Version": "2.0"
})
