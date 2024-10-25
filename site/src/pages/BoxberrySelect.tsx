import { FC } from 'react'

import Boxberry from '../components/Boxberry'
import CloudPaymentsButton from '../components/CloudPaymentsButton'


export type BoxberrySelectProps = {}


const BoxberrySelect: FC<BoxberrySelectProps> = ({

}) => {
  return (
    <div className='container-2'>
      <div className='row'>
        <div className='d-flex flex-row justify-content-between py-3'>
          <Boxberry />
        </div>

        <div className='d-flex flex-row justify-content-between py-3'>
          <CloudPaymentsButton />
        </div>

      </div>
    </div>
  )
}


export default BoxberrySelect
