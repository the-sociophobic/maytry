import { FC } from 'react'

import useStore, { DeliveryTypeType, PaymentTypeType } from '../hooks/useStore'
import Input from '../components/Input'
import LinkWrapper from '../components/LinkWrapper'
import Button from '../components/Button'
import Radio from '../components/Radio'


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

  const data_not_filled = userFullName.length < 5
    || userPhone.length < 7
    || userEmail.length < 7
    || (deliveryType === 'Доставка до двери' && userAddress.length < 5)

  return (
    <div className='Details'>
      <div className='container-2 w-50'>
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
          onChange={setUserPhone}
          className='mb-4'
        />
        <Input
          label='Email'
          type='email'
          value={userEmail}
          onChange={setUserEmail}
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
          <LinkWrapper
            to='/checkout'
            disabled={data_not_filled}
          >
            <Button black>
              ДАЛЕЕ
            </Button>
          </LinkWrapper>
        </div>
      </div>
    </div>
  )
}


export default Details
