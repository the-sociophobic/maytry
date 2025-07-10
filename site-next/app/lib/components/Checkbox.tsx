import { FC } from 'react'


export type CheckboxProps = {
  value: boolean
  onChange: (value: boolean) => void
  label: string
  className?: string
  disabled?: boolean
}


const Checkbox: FC<CheckboxProps> = ({
  value,
  label,
  onChange,
  className,
  disabled
}) => {
  return (
    <div
      onClick={() => !disabled && onChange(!value)}
      className={`
        Checkbox
        ${className}
        ${value && 'Checkbox--checked'}
        ${disabled && 'Checkbox--disables'}
      `}
    >
      {label}
    </div>
  )
}


export default Checkbox
