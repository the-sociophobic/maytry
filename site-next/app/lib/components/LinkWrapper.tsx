import Link from 'next/link'

import React, { MouseEventHandler } from 'react'

import isExternalLink from '../utils/isExternalLink'
// import NavLink from 'next/NavLink'


export type LinkWrapperProps = {
  className?: string
  activeClassName?: string
  style?: object
  to?: string
  sameTab?: boolean
  children?: any
  onClick?: (e: any) => void
  disabled?: boolean
  exact?: boolean
  outerRef?: any
  onMouseOver?: MouseEventHandler<HTMLAnchorElement>
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>
}


const LinkWrapper: React.FunctionComponent<LinkWrapperProps> = ({
  className,
  activeClassName,
  style,
  to,
  sameTab,
  children,
  onClick,
  disabled,
  exact,
  outerRef,
  ...other
}) => {
  return disabled || !to ?
    <span
      ref={outerRef}
      className={`Link Link--disabled ${className}`}
      style={style}
      onClick={(e: any) => onClick?.(e)}
      {...other}
    >
      {children}
    </span>
    :
    isExternalLink(to) ?
      <a
        ref={outerRef}
        className={`Link ${className}`}
        style={style}
        href={to}
        target={sameTab ? '' : '_blank'}
        rel="noreferrer"
        onClick={(e: any) => onClick?.(e)}
        {...other}
      >
        {children}
      </a>
      :
      // activeClassName ?
      //   <NavLink
      //     ref={outerRef}
      //     end={typeof exact !== 'undefined' ? exact : true}
      //     // to={to + location.search}
      //     to={to}
      //     className={({ isActive }) =>
      //       isActive ? `Link--active ${activeClassName}` : `Link ${className}`
      //     }
      //     style={style}
      //     onClick={(e: any) => {
      //       window?.Telegram?.WebApp?.BackButton?.show?.()
      //       onClick?.(e)
      //     }}
      //     {...other}
      //   >
      //     {children}
      //   </NavLink>
      //   :
        <Link
          ref={outerRef}
          // to={to + location.search}
          href={to}
          className={`Link ${className}`}
          style={style}
          onClick={(e: any) => {
            window?.Telegram?.WebApp?.BackButton?.show?.()
            onClick?.(e)
          }}
          {...other}
        >
          {children}
        </Link>
}


export default LinkWrapper
