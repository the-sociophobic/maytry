'use client'

import { FC, ReactNode } from 'react'

import { ScrollToConsumer } from './ScrollTo'
import Header from './Header'
import Footer from './Footer'
import Loader from './Loader'
import useStore from '../hooks/useStore'


export type AppLayoutProps = {
  children: ReactNode
}


const AppLayout: FC<AppLayoutProps> = ({
  children
}) => {
  const { isLoading } = useStore()

  return (
    <ScrollToConsumer>
      {({ contentRef }) =>
        <div className='App'>
          <div
            className='content'
            ref={contentRef as any}
          >
            <Header />
            {children}
            <Footer />
          </div>
          {isLoading &&
            <Loader />
          }
        </div>
      }
    </ScrollToConsumer>
  )
}


export default AppLayout
