import { post } from '../requests'
import {
  ParselCreateRequestTypeFE,
  ParselCreateResponseErrorType,
  ParselCreateResponseType
} from '../../types/boxberry.type'


const parselCreate = async (props: ParselCreateRequestTypeFE) =>
  post<ParselCreateResponseType | ParselCreateResponseErrorType>(
    '/parsel-create',
    props
  )


export default parselCreate
