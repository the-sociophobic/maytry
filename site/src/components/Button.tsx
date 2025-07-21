import React, { MouseEventHandler } from 'react'


export type ButtonProps = {
  title?: string
  children?: React.ReactNode
  onClick?: any
  onMouseDown?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string | boolean
  gray?: boolean
  black?: boolean
  transparent?: boolean
  medium?: boolean
  hoverable?: boolean
  onMouseOver?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}


const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onClick,
  disabled,
  className,
  gray,
  black,
  transparent,
  medium,
  hoverable,
  type = 'button',
  ...other
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        Button
        ${disabled && 'Button--disabled'}
        ${gray && 'Button--gray'}
        ${black && 'Button--black'}
        ${transparent && 'Button--transparent'}
        ${medium && 'Button--medium'}
        ${hoverable && 'Button--hoverable'}
        ${className}
      `}
      onClick={e => {
        onClick?.(e)
      }}
      onMouseDown={other.onMouseDown}
      {...other}
    >
      {title ? title : ''}
      {children}
    </button>
  )
}


export default Button
