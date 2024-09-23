import { FC } from 'react'

import { ColorType } from '../hooks/useContentful/types'
import Color from './Color'
import { toggleInSet } from '../utils/sets'


export type ColorSelectorProps = {
  colors: ColorType[]
  selectedColorIds: string[]
  onChange: (selectedColorIds: string[]) => void
  className?: string
}


const ColorSelector: FC<ColorSelectorProps> = ({
  colors,
  selectedColorIds,
  onChange,
  className
}) => {
  return (
    <div className={`ColorSelector ${className}`}>
      <div className='d-flex flex-row align-items-center flex-wrap'>
        <p className='m-0 me-3'>Цвета:</p>
        {colors.map(color =>
          <Color
            key={color.id}
            {...color}
            selected={selectedColorIds.includes(color.id)}
            onClick={() => onChange(toggleInSet(selectedColorIds, color.id))}
            className='me-3'
          />
        )}
      </div>
    </div>
  )
}


export default ColorSelector
