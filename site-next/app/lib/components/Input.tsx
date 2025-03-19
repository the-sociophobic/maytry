import React from 'react'


type InputProps = {
  value: string | number
  onChange: (value: any) => void
  onBlur?: (e: any) => void
  type?: React.HTMLInputTypeAttribute
  label?: string
  placeholder?: string
  className?: string
  children?: JSX.Element | JSX.Element[]
  /** Show form-control is-valid if true */
  isSuccess?: boolean
  min?: number
  max?: number | string | undefined
  _ref?: React.RefObject<HTMLInputElement>
}


const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type,
  label,
  placeholder,
  className,
  children,
  isSuccess,
  onBlur,
  min,
  max,
  _ref
}) => (
  <div className={`Input ${className}`}>
    {label &&
      <div className="Input__label">
        {label}
      </div>
    }
    <input
      ref={_ref}
      type={type}
      className={`Input__input ${max && 'Input__input--max'} ${
        isSuccess && 'text-success form-control bg-transparent is-valid'
      }`}
      value={value}
      onBlur={onBlur}
      autoComplete="off"
      autoCorrect="off"
      onChange={(e) => onChange(e.target.value)}
      min={type === 'number' ? min || '0' : undefined}
      max={(type === 'number' && max) || undefined}
      placeholder={placeholder}
    />
    {children &&
      <div className="Input__children">
        {children}
      </div>
    }
  </div>
)


export default Input
