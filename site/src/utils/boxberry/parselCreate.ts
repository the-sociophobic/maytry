import {
  ParselCreateErrorType,
  ParselCreateRequestTypeFE,
  ParselCreateResponceType
} from '../../types/boxberry.type'
import { post } from '../requests'


const parselCreate = async (props: ParselCreateRequestTypeFE) =>
  post<ParselCreateResponceType | ParselCreateErrorType>('/parsel-create', props)


export default parselCreate
