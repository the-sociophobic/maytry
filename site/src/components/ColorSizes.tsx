import { FC } from 'react'

import Color from './Color'
import { ContentfulColorType, ContentfulSizeType } from '../types/contentful.type'


export type ColorSizesProps = {
  color?: ContentfulColorType
  sizes: (ContentfulSizeType & { available?: boolean })[]
  className?: string
  colorAsText?: boolean
}


const ColorSizes: FC<ColorSizesProps> = ({
  color,
  sizes,
  className,
  colorAsText
}) => {
  return (
    <div className={`ColorSizes ${className}`}>
      {color && (
        colorAsText ?
          color.name
          :
          <Color
            {...color}
            className='me-3'
          />
      )}
      {sizes.map((size, sizeIndex) =>
        <div
          key={sizeIndex}
          className={`
            ColorSizes__size
            ${(typeof size.available === 'boolean' && !size.available) && 'text-disabled'}
            ${colorAsText && 'ms-2'}
          `}
        >
          {size.name}
        </div>
      )}
    </div>
  )
}


export default ColorSizes
