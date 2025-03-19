'use client'

import { FC, useEffect, useState } from 'react'

import useStore from '../hooks/useStore'
import useTotalPrice from '../hooks/useTotalPrice'
import useDeliveryPrice from '../hooks/useDeliveryPrice'
import { printPrice } from '../utils/price'
import OrderCreateButton from './OrderCreateButton'
import Radio from './Radio'
import Input from './Input'
import Button from './Button'
import useContentful from '../hooks/useContentful'
import useTotalPriceWithPromocode from '../hooks/useTotalPriceWithPromocode'
import countableModels from '../utils/countable/models'
import { PaymentTypeType } from '../types/frontend.type'
import useTotalPriceWithPromocodeAndBoxberry from '../hooks/useTotalPriceWithPromocodeAndBoxberry'


const CheckoutPanel: FC = () => {
  const { paymentType } = useStore()
  const { setPaymentType } = useStore()
  const { itemsInCart } = useStore()
  const { boxberryData } = useStore()
  const totalPrice = useTotalPrice()
  const deliveryPrice = useDeliveryPrice()

  const { userFullName } = useStore()
  const { userPhone } = useStore()
  const { userEmail } = useStore()
  const { deliveryType } = useStore()
  const { userAddress } = useStore()
  const { userZIP } = useStore()
  const { userCity } = useStore()
  const { parselCreateError } = useStore()
  const { setParselCreateError } = useStore()

  const data_not_filled = userFullName.length < 3
    || userPhone.length < 7
    || userEmail.length < 7
    // || (deliveryType === 'Доставка до двери' && (userAddress.length < 5 || userZIP.length !== 6 || deliveryPrice === -1))
    || (deliveryType === 'Доставка до двери' ?
      (userAddress.length < 5 || userCity.length < 5 || userZIP.length !== 6)
      :
      !boxberryData
    )
  const showFreeDeliveryOption = deliveryPrice > 0

  useEffect(() => {
    setParselCreateError(undefined)
  }, [])
  useEffect(() => {
    setParselCreateError(undefined)
  }, [deliveryType, userZIP, userCity, userAddress])

  const { currentPromocode } = useStore()
  const { setCurrentPromocode } = useStore()
  const [promocodeText, setPromocodeText] = useState(currentPromocode ? currentPromocode.name : '')
  const { data: contentful } = useContentful()
  const promocodes = contentful?.promocodes

  const [promocodeError, setPromocodeError] = useState('')
  const updatePromocodeText = (newPromocodeText: string) => {
    setPromocodeText(newPromocodeText)
    setPromocodeError('')
  }
  const applyPromocode = () => {
    const promocode = promocodes
      ?.find(promocode => promocode.name.localeCompare(promocodeText) === 0)

    if (promocode) {
      setCurrentPromocode(promocode)
    } else {
      setPromocodeError(`Промокод "${promocodeText}" не найден`)
      setCurrentPromocode(undefined)
    }
  }

  // const totalPriceWithBoxberry = totalPrice + deliveryPrice
  const totalPriceWithPromocode = useTotalPriceWithPromocode()
  const totalPriceWithPromocodeAndBoxberry = useTotalPriceWithPromocodeAndBoxberry()
  const promocodePrint = currentPromocode && printPrice(totalPriceWithPromocode - totalPrice)

  return (
    <>
      <div className='d-flex flex-row align-items-end'>
        <Input
          value={promocodeText}
          onChange={updatePromocodeText}
          label='ПРОМОКОД'
        />
        <Button
          black
          onClick={applyPromocode}
        >
          ПРИМЕНИТЬ
        </Button>
      </div>
      {promocodeError.length > 0 &&
        <div className='d-flex flex-row justify-content-between py-2'>
          ERR: {promocodeError}
        </div>
      }
      {currentPromocode &&
        <div className='d-flex flex-row justify-content-between py-2'>
          Применён промокод "{currentPromocode.name}" на скидку {currentPromocode.amount}{currentPromocode.p_type ? '%' : '₽'} {!currentPromocode?.items ? '' : `для ${countableModels(currentPromocode.items.length)} ${currentPromocode.items.map(item => item.link).join(', ')}`}
        </div>
      }

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
          Доставка. {!showFreeDeliveryOption ? '' : '(Бесплатно при заказе от 6000)'}
        </div>
        <div className='ms-auto'>
          {deliveryType === 'Доставка до двери' ?
            // deliveryPrice !== -1 ? printPrice(deliveryPrice) : 'Неверный почтовый индекс'
            printPrice(deliveryPrice)
            :
            boxberryData ? printPrice(deliveryPrice) : 'Выберите пункт выдачи'
          }
        </div>
      </div>
      {currentPromocode &&
        <div className='d-flex flex-row mt-3'>
          <div className=''>
            Скидка по промокоду.
          </div>
          <div className='ms-auto'>
            {promocodePrint}
          </div>
        </div>
      }
      <div
        className='d-flex flex-row mt-3'
      >
        <div className=''>
          Итого.
        </div>
        <div className='ms-auto'>
          {printPrice(totalPriceWithPromocodeAndBoxberry)}
        </div>
      </div>

      <h4 className='h4 mt-5 mb-4 font-bold'>
        Оплата
      </h4>

      <Radio
        selected={paymentType}
        options={[
          'Оплата онлайн',
          'Оплата долями CloudPayments',
          'Оплата при получении'
        ]}
        onChange={(option: string) => setPaymentType(option as PaymentTypeType)}
        className='mb-5'
      />

      {parselCreateError &&
        <div className='d-flex flex-row justify-content-between py-2'>
          ERR: {parselCreateError}
        </div>
      }
      <div className='d-flex flex-row justify-content-between py-3'>
        <OrderCreateButton
          disabled={data_not_filled}
        />
      </div>
    </>
  )
}


export default CheckoutPanel
