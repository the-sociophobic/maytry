import { FC } from 'react'

import { printPrice } from '../utils/price'


export type PriceProps = {
  price?: number
  salePrice?: number
  className?: string
  interval?: [number, number]
}


const Price: FC<PriceProps> = ({
  price,
  salePrice,
  className,
  interval
}) => {
  return !interval ?
    <div className={`d-flex flex-column ${className}`}>
      <div className={salePrice ? 'text-strikethrough' : ''}>
        {printPrice(price || 0)}
      </div>
      {salePrice &&
        <div>
          {printPrice(salePrice)}
        </div>
      }
    </div>
    :
    <div className='className'>
      {`${printPrice(interval[0])} ${interval[0] !== interval[1] ? ` - ${printPrice(interval[1])}` : ''}`}
    </div>
}


export default Price
