import { FC, ReactNode } from 'react'

import useTitle from '../hooks/useTitle'
import LinkWrapper, { LinkWrapperProps } from './LinkWrapper'
import Button, { ButtonProps } from './Button'


export type NavigationProps = Pick<LinkWrapperProps, 'disabled' | 'to'> & Pick<ButtonProps, 'title'> & {
  closeWebApp?: boolean
}

export type LayoutProps = {
  title: string
  description: string
  children: ReactNode
  navigations: NavigationProps[]
}


const Layout: FC<LayoutProps> = ({
  title,
  description,
  children,
  navigations
}) => {
  useTitle(title)

  return (
    <div className='Layout'>
      {children}
    </div>
  )
}


export default Layout
