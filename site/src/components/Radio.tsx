import { FC } from 'react'


export type RadioProps = {
  selected: string
  options: string[]
  onChange: (option: string) => void
  className?: string
}


const Radio: FC<RadioProps> = ({
  selected,
  options,
  onChange,
  className
}) => {
  return (
    <div className={`Radio ${className}`}>
      {options
        .map(option =>
          <div
            key={option}
            onClick={() => onChange(option)}
            className={`
              Radio__option
              ${option === selected && 'Radio__option--selected'}
            `}
          >
            {option}
          </div>
        )}
    </div>
  )
}


export default Radio
