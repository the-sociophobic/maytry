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
import Checkbox from './Checkbox'
import useOrderCreate from '../hooks/useOrderCreate'
import useUser from '../hooks/user/useUser'


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
  const { useBonuses, setUseBonuses } = useStore()
  const { data: user } = useUser()
  const orderCreate = useOrderCreate()
  const [showBonusSnackbar, setShowBonusSnackbar] = useState(false)
  const [bonusesSpent, setBonusesSpent] = useState(0)

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

  const payInPVZ_unavailable = boxberryData?.prepaid === '1'
  const paymentOptions = payInPVZ_unavailable ?
    [
      'Оплата онлайн',
      'Оплата долями CloudPayments',
    ]
    :
    [
      'Оплата онлайн',
      'Оплата долями CloudPayments',
      'Оплата при получении'
    ]

  const availableBonuses = (user?.bonuses ?? []).filter((b: any) => (!b.expiresAt || b.expiresAt > Date.now())).reduce((sum: number, b: any) => sum + (b.amount - (b.usedAmount || 0)), 0)
  const maxBonusesToUse = Math.floor(totalPriceWithPromocode * 0.3)
  const bonusesToUse = useBonuses ? Math.min(availableBonuses, maxBonusesToUse) : 0
  const totalWithBonuses = totalPriceWithPromocodeAndBoxberry - bonusesToUse

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
      {useBonuses && bonusesToUse > 0 && (
        <div className='d-flex flex-row mt-3' style={{ color: '#1a8917', fontWeight: 500 }}>
          <div className=''>
            Использовано:
          </div>
          <div className='ms-auto'>
            {bonusesToUse} CTRL
          </div>
        </div>
      )}
      <div
        className='d-flex flex-row mt-3'
      >
        <div className=''>
          Итого.
        </div>
        <div className='ms-auto'>
          {printPrice(totalWithBonuses)}
        </div>
      </div>

      <h4 className='h4 mt-5 mb-4 font-bold'>
        Оплата
      </h4>

      <Radio
        selected={paymentType}
        options={paymentOptions}
        onChange={(option: string) => setPaymentType(option as PaymentTypeType)}
      />

      {payInPVZ_unavailable &&
        <div className='d-flex flex-row justify-content-between py-2'>
          В данном отделении недоступна оплата при получении. Только по предоплате
        </div>
      }

      {parselCreateError &&
        <div className='d-flex flex-row justify-content-between py-2 mt-5'>
          ERR: {parselCreateError}
        </div>
      }
      <div className='d-flex flex-row align-items-center my-3'>
        <Checkbox
          value={useBonuses}
          onChange={setUseBonuses}
          label={`Использовать бонусы (Ctrl Coins) — доступно: ${availableBonuses} ₽ (до 30% от суммы заказа)`}
        />
      </div>
      <div className='d-flex flex-row justify-content-between py-3'>
        <OrderCreateButton
          disabled={data_not_filled}
          price={totalWithBonuses}
          onClick={async () => {
            const { bonusesUsed } = await orderCreate({ bonusesToUse, totalWithBonuses })
            if (bonusesUsed > 0) {
              setBonusesSpent(bonusesUsed)
              setShowBonusSnackbar(true)
              setTimeout(() => setShowBonusSnackbar(false), 5000)
            }
          }}
        />
      </div>
      {showBonusSnackbar && (
        <div style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          margin: '0 auto',
          background: '#222',
          color: '#fff',
          padding: 16,
          textAlign: 'center',
          zIndex: 9999,
          borderRadius: 8,
          maxWidth: 400
        }}>
          Использовано: {bonusesSpent} CTRL
        </div>
      )}
    </>
  )
}


export default CheckoutPanel
