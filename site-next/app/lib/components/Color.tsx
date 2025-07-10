import { FC } from 'react'

import { ContentfulColorType } from '../types/contentful.type'


export type ColorProps = ContentfulColorType & {
  className?: string
  onClick?: () => void
  selected?: boolean
}


const Color: FC<ColorProps> = ({
  name,
  colorCode,
  className,
  onClick,
  selected
}) => {
  return (
    <div
      title={name}
      className={`Color ${selected && 'Color--selected'} ${className}`}
      style={{ backgroundColor: colorCode }}
      onClick={onClick}
    />
  )
}


export default Color
