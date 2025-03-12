import { FC, ReactNode, useEffect } from 'react'

import {
  useLocation,
  Scripts,
  ScrollRestoration,
  Meta,  
} from 'react-router'

// import useTitle from '../hooks/useTitle'
import { LinkWrapperProps } from './LinkWrapper'
import { ButtonProps } from './Button'
import Header from './Header'
import Footer from './Footer'
import useStore from '../hooks/useStore'
import QueryWrapper from './QueryWrapper'

// import appStylesHref from "./app.css?url"


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
  // title,
  // description,
  children,
  // navigations,
}) => {
  // useTitle(title)
  const location = useLocation()

  const { setShowExtendedFilter } = useStore()
  useEffect(() => {
    if (location.pathname !== '/')
      setShowExtendedFilter(false)
  }, [
    location.pathname,
    setShowExtendedFilter
  ])

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link
        rel="stylesheet"
        href={appStylesHref}
      /> */}
      <Meta />
    </head>
    <body>
      <QueryWrapper>
        <Header />
        {children}
        {!location.pathname.includes('/item/') &&
          <Footer />
        }
      </QueryWrapper>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
  )
}


export default Layout
