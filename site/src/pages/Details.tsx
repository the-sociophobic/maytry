import { FC } from 'react'

import useStore, { DeliveryTypeType, PaymentTypeType } from '../hooks/useStore'
import Input from '../components/Input'
import LinkWrapper from '../components/LinkWrapper'
import Button from '../components/Button'
import Radio from '../components/Radio'
import fixPhone from '../utils/fixPhone'
import fixEmail from '../utils/fixEmail'
import { printPrice } from '../utils/price'
import useTotalPrice from '../hooks/useTotalPrice'
import CloudPaymentsButton from '../components/CloudPaymentsButton'
import useDeliveryPrice from '../hooks/useDeliveryPrice'


export type DetailsProps = {

}


const Details: FC<DetailsProps> = ({

}) => {
  const { userFullName } = useStore()
  const { setUserFullName } = useStore()
  const { userPhone } = useStore()
  const { setUserPhone } = useStore()
  const { userEmail } = useStore()
  const { setUserEmail } = useStore()
  const { deliveryType } = useStore()
  const { setDeliveryType } = useStore()
  const { userAddress } = useStore()
  const { setUserAddress } = useStore()
  const { paymentType } = useStore()
  const { setPaymentType } = useStore()
  const { itemsInCart } = useStore()
  const totalPrice = useTotalPrice()
  const deliveryPrice = useDeliveryPrice()

  const data_not_filled = userFullName.length < 5
    || userPhone.length < 7
    || userEmail.length < 7
    || (deliveryType === 'Доставка до двери' && userAddress.length < 5)


  return (
    <div className='container-2'>
      <div className='row'>
        <div className='col-9 col-md-4 d-flex flex-column order-md-last mb-5'>
          <h4 className='h4'>
            Товары
          </h4>
          {itemsInCart.map((item, itemIndex) =>
            <div
              key={item.id}
              className='d-flex flex-row mt-3'
            >
              <div className=''>
                {itemIndex + 1}. {item.name}
              </div>
              <div className='ms-auto'>
                {item.quantity} × {printPrice(item.salePrice || item.price)} = {printPrice((item.salePrice || item.price) * item.quantity)}
              </div>
            </div>
          )}
          {deliveryType === 'Доставка до двери' &&
            <div
              className='d-flex flex-row mt-3'
            >
              Доставка. {printPrice(deliveryPrice)}
            </div>
          }
          <div
            className='d-flex flex-row mt-3'
          >
            Итого. {printPrice(totalPrice)}
          </div>
        </div>

        <div className='col-9 col-md-5 pe-md-5'>
          <h4 className='h4'>
            Контакты
          </h4>
          <Input
            label='ФИО'
            value={userFullName}
            onChange={setUserFullName}
            className='mb-4'
          />
          <Input
            label='Телефон'
            type={'tel'}
            value={userPhone}
            onChange={value => setUserPhone(fixPhone(value))}
            className='mb-4'
          />
          <Input
            label='Email'
            type='email'
            value={userEmail}
            onChange={value => setUserEmail(fixEmail(value))}
            className='mb-4'
          />

          <h4 className='h4 mt-4'>
            Доставка
          </h4>

          <Radio
            selected={deliveryType}
            options={['Пункт выдачи Boxberry', 'Доставка до двери']}
            onChange={(option: string) => setDeliveryType(option as DeliveryTypeType)}
            className='mb-3'
          />
          {deliveryType === 'Доставка до двери' &&
            <Input
              label='Адрес'
              value={userAddress}
              onChange={setUserAddress}
            />
          }

          <h4 className='h4 mt-4'>
            Оплата
          </h4>

          <Radio
            selected={paymentType}
            options={['Оплата онлайн', 'Оплата долями CloudPayments', 'Оплата при получении']}
            onChange={(option: string) => setPaymentType(option as PaymentTypeType)}
            className='mb-5'
          />

          <div className='d-flex flex-row justify-content-between py-3'>
            {deliveryType === 'Доставка до двери' ?
              <CloudPaymentsButton
                disabled={data_not_filled}
              />
              :
              <LinkWrapper
                to='/boxberry-select'
                disabled={data_not_filled}
              >
                <Button black>
                  ВЫБОР ПУНКТА ВЫДАЧИ
                </Button>
              </LinkWrapper>
            }
          </div>
        </div>

      </div>
    </div>
  )
}


export default Details
