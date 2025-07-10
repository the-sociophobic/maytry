import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import useStore from '../hooks/useStore'
import useDeliveryPrice from '../hooks/useDeliveryPrice'
import parselCreate from '../utils/boxberry/parselCreate'
import useTotalPriceWithPromocode from './useTotalPriceWithPromocode'
import { ParselCreateResponseErrorType, ParselCreateResponseType, ParselCreateRequestTypeFE } from '../types/boxberry.type'
import useLoginAfterOrder from './user/useLoginAfterOrder'
import dataLayer from '../utils/dataLayer'


export type ParselCreateRequestTypeWithBonuses = ParselCreateRequestTypeFE & { useBonuses?: boolean }

const useOrderCreate = () => {
  const { deliveryType } = useStore()
  const kurdost = deliveryType === 'Доставка до двери'
  const { boxberryData } = useStore()
  const { userZIP } = useStore()
  const { userCity } = useStore()
  const { userAddress } = useStore()
  const { paymentType } = useStore()

  // const { setBoxberryData } = useStore()
  const { emptyCart } = useStore()
  const { itemsInCart } = useStore()

  const deliveryPrice = useDeliveryPrice()
  const totalPriceWithPromocode = useTotalPriceWithPromocode()
  const totalPriceWithPromocodeAndBoxberry = totalPriceWithPromocode + deliveryPrice

  const navigate = useNavigate()

  const { userFullName } = useStore()
  const { userPhone } = useStore()
  const { userEmail } = useStore()
  const { setParselCreateError } = useStore()
  const { currentPromocode } = useStore()
  const { setCurrentPromocode } = useStore()

  const queryClient = useQueryClient()
  
  const loginAfterOrder = useLoginAfterOrder()

  const [useBonuses, setUseBonuses] = useState(false)

  const orderCreate = useCallback(async () => {
    const res = await parselCreate({
      price: totalPriceWithPromocode,
      payment_sum: paymentType === 'Оплата при получении' ? totalPriceWithPromocodeAndBoxberry : 0,
      delivery_sum: deliveryPrice,

      pvz_number: kurdost ? undefined : boxberryData?.id || '',
      zip: kurdost ? userZIP : undefined,
      city: kurdost ? userCity : undefined,
      address: kurdost ? userAddress : undefined,

      fio: userFullName,
      phone: userPhone,
      email: userEmail,

      items: itemsInCart,
      promocode: currentPromocode,
      useBonuses // <-- передаём флаг
    } as ParselCreateRequestTypeWithBonuses)
    console.log('parselCreate', res)

    if ((res as ParselCreateResponseErrorType).err) {
      setParselCreateError((res as ParselCreateResponseErrorType).err)
      navigate('/fail')
      return { bonusesUsed: 0 }
    } else {
      dataLayer({
        actionType: 'purchase',
        items: itemsInCart,
        promocode: currentPromocode,
        orderId: (res as any as { parcel: ParselCreateResponseType }).parcel.track
      })
      emptyCart()
      setCurrentPromocode(undefined)
      queryClient.invalidateQueries({ queryKey: 'contentful' })
      queryClient.invalidateQueries({ queryKey: 'orders' })
      loginAfterOrder({ email: userEmail })
      // setBoxberryData(undefined)
      navigate('/success')
      return { bonusesUsed: (res as any).bonusesUsed || 0 }
    }
  }, [
    totalPriceWithPromocode,
    paymentType,
    totalPriceWithPromocodeAndBoxberry,
    deliveryPrice,
    kurdost,
    boxberryData,
    currentPromocode,
    emptyCart,
    itemsInCart,
    loginAfterOrder,
    navigate,
    queryClient,
    setCurrentPromocode,
    setParselCreateError,
    userAddress,
    userCity,
    userEmail,
    userFullName,
    userPhone,
    userZIP,
    useBonuses
  ])


  return { orderCreate, useBonuses, setUseBonuses }
}


export default useOrderCreate
