import { FC } from 'react'

import { ColorType } from '../hooks/useContentful/types'


export type ColorProps = ColorType & {
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
