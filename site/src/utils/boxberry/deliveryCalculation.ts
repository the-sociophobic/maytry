import {
  DeliveryCalculationRequestType,
  DeliveryCalculationResponceType
} from '../../types/boxberry.type'
import { post } from '../requests'


const deliveryCalculation = async (props: DeliveryCalculationRequestType) =>
  post<DeliveryCalculationResponceType>('/delivery-calculation', props)


export default deliveryCalculation
