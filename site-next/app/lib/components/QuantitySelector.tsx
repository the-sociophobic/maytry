import { FC } from 'react'

import Button from './Button'


export type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
  max: number
}


const QuantitySelector: FC<QuantitySelectorProps> = ({
  value,
  onChange,
  max
}) => {
  return (
    <div className='QuantitySelector'>
      <div className='d-flex flex-row align-items-center'>
        <Button
          black
          className={``}
          onClick={() => onChange(value - 1)}
        >
          -
        </Button>
        <div className='mx-3 no-select'>
          {value}
        </div>
        {value < max &&
          <Button
            black
            className={``}
            onClick={() => onChange(value + 1)}
          >
            +
          </Button>
        }
      </div>
    </div>
  )
}


export default QuantitySelector
