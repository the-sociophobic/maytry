import { FC } from 'react'

import LinkWrapper from '../lib/components/LinkWrapper'
import Button from '../lib/components/Button'
import useStore from '../lib/hooks/useStore'


export type FailProps = {}


const Fail: FC<FailProps> = ({

}) => {
  const { parselCreateError } = useStore()

  return (
    <div className='container-2'>
      <h4 className='h4 mt-5 mb-4 font-bold'>
        Ошибка
      </h4>
      {parselCreateError || 'Что-то пошло не так'}
      <LinkWrapper
        to='/cart'
        className='mt-4'
      >
        <Button black>
          ЗАКАЗАТЬ ЕЩЁ РАЗ
        </Button>
      </LinkWrapper>

    </div>
  )
}


export default Fail
