import React, { MouseEventHandler } from 'react'


export type ButtonProps = {
  title?: string
  children?: React.ReactNode
  onClick?: any
  disabled?: boolean
  className?: string | boolean
  gray?: boolean
  hoverable?: boolean
  onMouseOver?: MouseEventHandler<HTMLButtonElement>
}


const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onClick,
  disabled,
  className,
  gray,
  hoverable,
  ...other
}) => {
  return (
    <button
      disabled={disabled}
      className={`
        Button
        ${disabled && 'Button--disabled'}
        ${gray && 'Button--gray'}
        ${hoverable && 'Button--hoverable'}
        ${className}
      `}
      onClick={e => {
        onClick?.(e)
      }}
      {...other}
    >
      {title ? title : ''}
      {children}
    </button>
  )
}


export default Button
