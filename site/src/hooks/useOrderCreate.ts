import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import useStore from '../hooks/useStore'
import useDeliveryPrice from '../hooks/useDeliveryPrice'
import parselCreate from '../utils/boxberry/parselCreate'
import { ParselCreateErrorType } from '../types/boxberry.type'
import useTotalPriceWithPromocode from './useTotalPriceWithPromocode'


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

  const orderCreate = async () => {
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
      promocode: currentPromocode
    })
    console.log('parselCreate', res)

    if ((res as ParselCreateErrorType).err) {
      setParselCreateError((res as ParselCreateErrorType).err)
      navigate('/fail')
    } else {
      emptyCart()
      setCurrentPromocode(undefined)
      queryClient.invalidateQueries({ queryKey: 'contentful' })
      queryClient.invalidateQueries({ queryKey: 'orders' })
      // setBoxberryData(undefined)
      navigate('/success')
    }
  }


  return orderCreate
}


export default useOrderCreate
