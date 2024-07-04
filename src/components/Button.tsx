import React from 'react'


export type ButtonProps = {
  title?: string
  children?: React.ReactNode
  onClick?: any
  disabled?: boolean
  className?: string | boolean
}


const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onClick,
  disabled,
  className
}) => {
  return (
    <button
      disabled={disabled}
      className={`
      Button
      Button--green
      ${disabled && 'Button--disabled'}
      ${children ? 'justify-content-center' : 'justify-content-between'}
      ${className}
    `}
      onClick={e => {
        onClick?.(e)
      }}
    >
      {title ? title : ''}
      {children}
    </button>
  )
}


export default Button
