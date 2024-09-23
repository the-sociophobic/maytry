import { FC } from 'react'

import { printPrice } from '../utils/price'


export type PriceProps = {
  price: number
  salePrice?: number
  className?: string
}


const Price: FC<PriceProps> = ({
  price,
  salePrice,
  className
}) => {
  return (
    <div className={`d-flex flex-column ${className}`}>
      <div className={salePrice ? 'text-strikethrough' : ''}>
        {printPrice(price)}
      </div>
      {salePrice &&
        <div>
          {printPrice(salePrice)}
        </div>
      }
    </div>
  )
}


export default Price
