import { FC, ReactNode, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import useTitle from '../hooks/useTitle'
import { LinkWrapperProps } from './LinkWrapper'
import { ButtonProps } from './Button'
import Header from './Header'
import Footer from './Footer'
import useContentful from '../hooks/useContentful'
import useStore from '../hooks/useStore'


export type NavigationProps = Pick<LinkWrapperProps, 'disabled' | 'to'> & Pick<ButtonProps, 'title'> & {
  closeWebApp?: boolean
}

export type LayoutProps = {
  title: string
  description?: string
  children: ReactNode
  navigations?: NavigationProps[]
}


const Layout: FC<LayoutProps> = ({
  title,
  // description,
  children,
  // navigations,
}) => {
  useTitle(title)
  const location = useLocation()
  const { data: contentful } = useContentful()

  const { setShowExtendedFilter } = useStore()
  useEffect(() => {
    if (location.pathname !== '/')
      setShowExtendedFilter(false)
  }, [location.pathname])

  return (
    <>
      <Header />
      {children}
      {!contentful?.items
        .map(item => '/' + item.link)
        .includes(location.pathname)

        && <Footer />
      }
    </>
  )
}


export default Layout
