import { FC } from 'react'
import LinkWrapper from '../components/LinkWrapper'
import Button from '../components/Button'


export type FailProps = {}


const Fail: FC<FailProps> = ({

}) => {
  return (
    <div className='container-2'>
      Что-то пошло не так
      <LinkWrapper
        to='/checkout'
      >
        <Button black>
          ЗАКАЗАТЬ ЕЩЁ РАЗ
        </Button>
      </LinkWrapper>

    </div>
  )
}


export default Fail
