import { FC } from 'react'

import CheckoutPanel from '../components/CheckoutPanel'
import UserDataInputPanel from '../components/UserDataInputPanel'
import useStore, { DeliveryTypeType } from '../hooks/useStore'
import BoxberryPanel from '../components/BoxberryPanel'
import Radio from '../components/Radio'


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
