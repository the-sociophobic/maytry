import { FC, ReactNode, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import useTitle from '../hooks/useTitle'
import { LinkWrapperProps } from './LinkWrapper'
import { ButtonProps } from './Button'
import Header from './Header'
import Footer from './Footer'
import useStore from '../hooks/useStore'
import QueryWrapper from './QueryWrapper'
import { ScrollToConsumer, ScrollToWrapper } from './ScrollTo'
import Loader from './Loader'


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

  const { isLoading } = useStore()

  const { setShowExtendedFilter } = useStore()
  useEffect(() => {
    if (location.pathname !== '/')
      setShowExtendedFilter(false)
  }, [
    location.pathname,
    setShowExtendedFilter
  ])

  return (
    <QueryWrapper>
      <ScrollToWrapper>
        <ScrollToConsumer>
          {({ contentRef }) =>
            <div className='App'>
              <div className='content' ref={contentRef as any}>
                <Header />
                {children}
                {!location.pathname.includes('/item/') &&
                  <Footer />
                }
              </div>
              {isLoading && <Loader />}
            </div>
          }
        </ScrollToConsumer>
      </ScrollToWrapper>
    </QueryWrapper>
  )
}


export default Layout
