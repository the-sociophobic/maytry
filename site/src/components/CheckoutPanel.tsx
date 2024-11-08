import { FC } from 'react'

import useStore, { PaymentTypeType } from '../hooks/useStore'
import useTotalPrice from '../hooks/useTotalPrice'
import useDeliveryPrice from '../hooks/useDeliveryPrice'
import { printPrice } from '../utils/price'
import OrderCreateButton from './OrderCreateButton'
import Radio from './Radio'


export type CheckoutPanelProps = {}


const CheckoutPanel: FC<CheckoutPanelProps> = ({

}) => {
  const { paymentType } = useStore()
  const { setPaymentType } = useStore()
  const { itemsInCart } = useStore()
  const { boxberryData } = useStore()
  const totalPrice = useTotalPrice()
  const deliveryPrice = useDeliveryPrice()
  const totalPriceWithBoxberry = totalPrice + deliveryPrice

  const { userFullName } = useStore()
  const { userPhone } = useStore()
  const { userEmail } = useStore()
  const { deliveryType } = useStore()
  const { userAddress } = useStore()
  // const { userZIP } = useStore()
  const { userCity } = useStore()
  const data_not_filled = userFullName.length < 5
    || userPhone.length < 7
    || userEmail.length < 7
    || userCity.length < 5
    // || (deliveryType === 'Доставка до двери' && (userAddress.length < 5 || userZIP.length !== 6 || deliveryPrice === -1))
    || (deliveryType === 'Доставка до двери' && (userAddress.length < 5 || deliveryPrice === -1))

  return (
    <>
      <h4 className='h4 mt-5 mb-4 font-bold'>
        Товары
      </h4>
      {itemsInCart.map((item, itemIndex) =>
        <div
          key={item.id}
          className='d-flex flex-row'
        >
          <div className=''>
            {itemIndex + 1}. {item.name}
          </div>
          <div className='ms-auto'>
            {item.quantity} × {printPrice(item.salePrice || item.price)} = {printPrice((item.salePrice || item.price) * item.quantity)}
          </div>
        </div>
      )}
      <div
        className='d-flex flex-row mt-3'
      >
        <div className=''>
          Доставка.
        </div>
        <div className='ms-auto'>
          {deliveryType === 'Доставка до двери' ?
            deliveryPrice !== -1 ? printPrice(deliveryPrice) : 'Неверный почтовый индекс'
            :
            boxberryData ? printPrice(deliveryPrice) : 'Выберите пункт выдачи'
          }
        </div>
      </div>
      <div
        className='d-flex flex-row mt-3'
      >
        <div className=''>
          Итого.
        </div>
        <div className='ms-auto'>
          {printPrice(totalPriceWithBoxberry)}
        </div>
      </div>

      <h4 className='h4 mt-5 mb-4 font-bold'>
        Оплата
      </h4>

      <Radio
        selected={paymentType}
        options={[
          'Оплата онлайн',
          // 'Оплата долями CloudPayments',
          'Оплата при получении'
        ]}
        onChange={(option: string) => setPaymentType(option as PaymentTypeType)}
        className='mb-5'
      />

      <div className='d-flex flex-row justify-content-between py-3'>
        <OrderCreateButton
          disabled={data_not_filled}
        />
      </div>
    </>
  )
}


export default CheckoutPanel
