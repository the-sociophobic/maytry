import {
  DeliveryCalculationRequestType,
  DeliveryCalculationResponseType
} from '../../types/boxberry.type'
import { post } from '../requests'


const deliveryCalculation = async (props: DeliveryCalculationRequestType) =>
  post<DeliveryCalculationResponseType>('/delivery-calculation', props)


export default deliveryCalculation
