'use client'

import { FC } from 'react'

import CheckoutPanel from '../lib/components/CheckoutPanel'
import UserDataInputPanel from '../lib/components/UserDataInputPanel'
import useStore from '../lib/hooks/useStore'
import BoxberryPanel from '../lib/components/BoxberryPanel'
import Radio from '../lib/components/Radio'
import { DeliveryTypeType } from '../lib/types/frontend.type'


const Checkout: FC = () => {
  const { deliveryType } = useStore()
  const { boxberryData } = useStore()
  const { setDeliveryType } = useStore()

  return (
    <div className='container-2'>
      <div className='row'>

        <div className='col-9 col-md-5 pe-md-5'>
          {deliveryType === 'Пункт выдачи Boxberry' && !boxberryData ?
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
              <BoxberryPanel />
            </>
            :
            <UserDataInputPanel />
          }
        </div>

        <div className='col-9 col-md-4 d-flex flex-column mb-5'>
          <CheckoutPanel />
        </div>

      </div>
    </div>
  )
}


export default Checkout
