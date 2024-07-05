import React from 'react'


type InputProps = {
  value: string | number
  onChange: (value: any) => void
  onBlur?: (e: any) => void
  number?: boolean
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
  number,
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
      type={number ? 'number' : undefined}
      className={`Input__input ${max && 'Input__input--max'} ${
        isSuccess && 'text-success form-control bg-transparent is-valid'
      }`}
      value={value}
      onBlur={onBlur}
      autoComplete="off"
      autoCorrect="off"
      onChange={(e) => onChange(e.target.value)}
      min={number ? min || '0' : undefined}
      max={(number && max) || undefined}
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
