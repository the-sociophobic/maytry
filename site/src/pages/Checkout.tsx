import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import useStore from '../hooks/useStore'
import Boxberry from '../components/Boxberry'
import Button from '../components/Button'
import openCloudpayments from '../utils/openCloudpayments'
import useTotalPrice from '../hooks/useTotalPrice'
import { printPrice } from '../utils/price'
import postToBoxberry from '../utils/postToBoxberry'


export type CheckoutProps = {}


const Checkout: FC<CheckoutProps> = ({

}) => {
  const { boxberryData } = useStore()
  const { setBoxberryData } = useStore()
  const { emptyCart } = useStore()

  const totalPrice = useTotalPrice()
  const totalPriceWithBoxberry = totalPrice + parseInt(boxberryData?.price || '0')

  const navigate = useNavigate()

  return (
    <div className='container-2'>
      <div className='row'>
        <div className='d-flex flex-row justify-content-between py-3'>
          <Boxberry />
        </div>

        <div className='d-flex flex-row justify-content-between py-3'>
          <Button
            black
            disabled={!boxberryData}
            onClick={() => {
              postToBoxberry({
                order_id: '1',

                price: totalPrice,
                payment_sum: totalPriceWithBoxberry,
                delivery_sum: totalPriceWithBoxberry - totalPrice,
              
                pvz_number: boxberryData?.id || '',
              
                fio: 'Тест Тестовый Тестович',
                phone: '+79217406762',
                email: 'torikowashi@gmail.com',
              
                items: [],
              })
              openCloudpayments({
                amount: totalPriceWithBoxberry,
                onSuccess: () => {
                  emptyCart()
                  setBoxberryData(undefined)
                  navigate('/success')
                },
                onFail: () => {
                  navigate('/fail')
                },
                onComplete: () => { },
              })
            }}
          >
            ОПЛАТИТЬ {printPrice(totalPriceWithBoxberry)}
          </Button>
        </div>

      </div>
    </div>
  )
}


export default Checkout
