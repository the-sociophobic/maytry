import { useCallback } from 'react'

import useStore from './useStore'
import useAddressCheck from './useAddressCheck'


const ZIP_ERRORS = [
  'Возникла ошибка при расчете',
  'Необходимо указать Отделение получения, Город получения или Почтовый индекс'
]


const useProceedAfterAddressCheck = () => {
  const { deliveryType } = useStore()
  const { setParselCreateError } = useStore()
  const { userZIP } = useStore()
  const addressCheck = useAddressCheck()

  const proceedAfterAddressCheck = useCallback(
    async (fn: () => Promise<void>) => {
      if (deliveryType === 'Доставка до двери') {
        const addressCheckRes = await addressCheck(userZIP)

        if (addressCheckRes.error) {
          setParselCreateError(
            ZIP_ERRORS.includes(addressCheckRes.message || '') ?
              'Проверьте почтовый индекс и адрес доставки'
              :
              addressCheckRes.message
          )

          return
        }
      }

      setParselCreateError(undefined)
      await fn()
    }
  , [deliveryType, userZIP, addressCheck, setParselCreateError])

  return proceedAfterAddressCheck
}


export default useProceedAfterAddressCheck
