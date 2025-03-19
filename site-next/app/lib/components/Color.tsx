import { FC } from 'react'

import { ContentfulColorType } from '../types/contentful.type'


export type ColorProps = ContentfulColorType & {
  className?: string
  onClick?: () => void
  selected?: boolean
}


const Color: FC<ColorProps> = ({
  name: _name,
  colorCode,
  className,
  onClick,
  selected
}) => {
  return (
    <div
      className={`Color ${selected && 'Color--selected'} ${className}`}
      style={{ backgroundColor: colorCode }}
      onClick={onClick}
    />
  )
}


export default Color
