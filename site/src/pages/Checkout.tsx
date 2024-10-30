import { FC } from 'react'

import CheckoutPanel from '../components/CheckoutPanel'
import UserDataInputPanel from '../components/UserDataInputPanel'
import useStore from '../hooks/useStore'
import BoxberryPanel from '../components/BoxberryPanel'


export type CheckoutProps = {}


const Checkout: FC<CheckoutProps> = ({

}) => {
  const { deliveryType } = useStore()
  const { boxberryData } = useStore()

  return (
    <div className='container-2'>
      <div className='row'>

        <div className='col-9 col-md-5 pe-md-5'>
          {deliveryType === 'Пункт выдачи Boxberry' && !boxberryData ?
            <BoxberryPanel />
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
