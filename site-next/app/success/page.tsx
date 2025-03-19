import { FC } from 'react'

import useStore from '../lib/hooks/useStore'
import LinkWrapper from '../lib/components/LinkWrapper'


const Success: FC = () => {
  const { userEmail } = useStore()

  return (
    <div className='container-2'>
      <p className='h4 font-bold text-center'>
        Спасибо за ваш заказ! Он был успешно оформлен.
      </p>
      <p className='h4 text-center'>
        <br /><br />
        Подтверждение придёт на указанную вами почту {userEmail} в течении минуты. Если не можете его найти - <b className='h4 font-bold'>проверьте, пожалуйста, спам.</b>
        <br /><br />
        В ближайшее время заказ будет передан службе доставки Boxberry. Информацию по отслеживанию посылки вы сможете найти в письме с подтверждением заказа.
        <br /><br />
        При возникновении каких-либо вопросов свяжитесь с нами любым удобным для вас способом: <LinkWrapper to='/contacts' className='h4 d-inline-flex text-black text-decoration-underline'>контакты</LinkWrapper>
      </p>
    </div>
  )
}


export default Success
