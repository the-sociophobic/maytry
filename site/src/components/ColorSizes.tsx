import { FC } from 'react'

import { ColorType, SizeType } from '../hooks/useContentful/types'
import Color from './Color'


export type ColorSizesProps = {
  color?: ColorType
  sizes: (SizeType & { available: boolean } )[]
  className?: string
}


const ColorSizes: FC<ColorSizesProps> = ({
  color,
  sizes,
  className
}) => {
  return (
    <div className={`ColorSizes ${className}`}>
      {color && <Color
        {...color}
        className='me-3'
      />}
      {sizes.map((size, sizeIndex) =>
        <div
          key={sizeIndex}
          className={`ColorSizes__size ${!size.available && 'text-disabled'}`}
        >
          {size.name}
        </div>
      )}
    </div>
  )
}


export default ColorSizes
