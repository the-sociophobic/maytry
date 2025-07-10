'use client'

import { FC, useEffect, useState } from 'react'

import useStore from '../hooks/useStore'
import Input from '../components/Input'
import fixPhone from '../utils/fixPhone'
import fixEmail from '../utils/fixEmail'
import Button from './Button'
import useDeliveryPeriod from '../hooks/useDeliveryPeriod'
import Radio from './Radio'
import days from '../utils/countable/days'
import yandexGoal from '../utils/yandex/goal'
import { YANDEX_GOAL } from '../utils/yandex/consts'
import { DeliveryTypeType } from '../types/frontend.type'


const UserDataInputPanel: FC = () => {
  const { userFullName } = useStore()
  const { setUserFullName } = useStore()
  const { userPhone } = useStore()
  const { setUserPhone } = useStore()
  const { userEmail } = useStore()
  const { setUserEmail } = useStore()
  const { deliveryType } = useStore()
  const { setDeliveryType } = useStore()
  const { boxberryData } = useStore()
  const { setBoxberryData } = useStore()
  const { userCity } = useStore()
  const { setUserCity } = useStore()
  const { userAddress } = useStore()
  const { setUserAddress } = useStore()
  const { userZIP } = useStore()
  const { setUserZIP } = useStore()
  const deliveryPeriod = useDeliveryPeriod()

  const [startedFormFilling, setStartedFormFilling] = useState(false)

  useEffect(() => {
    if (deliveryType === 'Доставка до двери')
      setUserZIP('')
  }, [
    deliveryType,
    setUserZIP
  ])

  return (
    <>
      <h4 className='h4 mt-5 mb-4 font-bold'>
        Доставка
      </h4>

      <Radio
        selected={deliveryType}
        options={['Пункт выдачи Boxberry', 'Доставка до двери']}
        onChange={(option: string) => setDeliveryType(option as DeliveryTypeType)}
        className='mb-2'
      />

      <div className=''>
        Срок доставки: {deliveryPeriod} {days(deliveryPeriod)}
      </div>

      <h4 className='h4 mt-5 mb-4 font-bold'>
        Адрес
      </h4>
      {deliveryType === 'Доставка до двери' ?
        <>
          <Input
            label='Почтовый индекс'
            type='number'
            value={userZIP}
            onChange={setUserZIP}
            className='mb-2'
          />
          <Input
            label='Город'
            value={userCity}
            onChange={setUserCity}
            className='mb-2'
          />
          <Input
            label='Адрес'
            value={userAddress}
            onChange={setUserAddress}
            className='mb-2'
          />
        </>
        :
        <>
          <div className='mb-2'>
            Пункт выдачи: {boxberryData ? boxberryData.address : 'Не выбран'}
          </div>
          <Button
            black
            onClick={() => setBoxberryData(undefined)}
          >
            Поменять пункт выдачи
          </Button>
        </>
      }

      <h4 className='h4 mt-5 mb-4 font-bold'>
        Контакты
      </h4>
      <Input
        label='ФИО'
        value={userFullName}
        onChange={value => {
          if (!startedFormFilling) {
            yandexGoal({ goalId: YANDEX_GOAL.STARTED_FILLING_ORDER })
            setStartedFormFilling(true)
          }
          setUserFullName(value)
        }}
        className='mb-2'
      />
      <Input
        label='Телефон'
        type={'tel'}
        value={userPhone}
        onChange={value => setUserPhone(fixPhone(value))}
        className='mb-2'
      />
      <Input
        label='Email'
        type='email'
        value={userEmail}
        onChange={value => setUserEmail(fixEmail(value))}
        className='mb-2'
      />
    </>
  )
}


export default UserDataInputPanel
