import { FC } from 'react'
import printPrice from '../utils/printPrice'


export type PriceProps = {
  price: number
  salePrice?: number
}


const Price: FC<PriceProps> = ({
  price,
  salePrice
}) => {
  return (
    <div className='d-flex flex-column'>
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
