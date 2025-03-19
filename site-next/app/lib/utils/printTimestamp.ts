import { format } from 'date-fns'
import { ru } from 'date-fns/locale'


const printTimestamp = (timestamp?: number) =>
  !timestamp ?
    'не записан'
    :
    format(
      new Date(timestamp),
      'd MMM yyyy, HH:mm:ss',
      { locale: ru }
    )


export default printTimestamp
