import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import useStore from '../hooks/useStore'
import useTotalPrice from '../hooks/useTotalPrice'
import useDeliveryPrice from '../hooks/useDeliveryPrice'
import parselCreate from '../utils/boxberry/parselCreate'
import { ParselCreateErrorType } from '../types/boxberry.type'


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

  const totalPrice = useTotalPrice()
  const deliveryPrice = useDeliveryPrice()
  const totalPriceWithBoxberry = totalPrice + deliveryPrice

  const navigate = useNavigate()

  const { userFullName } = useStore()
  const { userPhone } = useStore()
  const { userEmail } = useStore()
  const { setParselCreateError } = useStore()

  const queryClient = useQueryClient()

  const orderCreate = async () => {
    const res = await parselCreate({
      price: totalPrice,
      payment_sum: paymentType === 'Оплата при получении' ? totalPriceWithBoxberry : 0,
      delivery_sum: deliveryPrice,

      pvz_number: kurdost ? undefined : boxberryData?.id || '',
      zip: kurdost ? userZIP : undefined,
      city: kurdost ? userCity : undefined,
      address: kurdost ? userAddress : undefined,

      fio: userFullName,
      phone: userPhone,
      email: userEmail,

      items: itemsInCart,
    })
    console.log('parselCreate', res)

    if ((res as ParselCreateErrorType).err) {
      setParselCreateError((res as ParselCreateErrorType).err)
      navigate('/fail')
    } else {
      emptyCart()
      queryClient.invalidateQueries({ queryKey: 'contentful' })
      queryClient.invalidateQueries({ queryKey: 'orders' })
      // setBoxberryData(undefined)
      navigate('/success')
    }
  }


  return orderCreate
}


export default useOrderCreate
