'use client'

import { FC, ReactNode, useEffect } from 'react'

import { ScrollToConsumer } from './ScrollTo'
import Header from './Header'
import { FooterCSR } from './Footer'
import LoaderSelfHandled from './LoaderSelfHandled'
import useStore from '../hooks/useStore'


export type AppLayoutProps = {
  children: ReactNode
}


const AppLayout: FC<AppLayoutProps> = ({
  children
}) => {
  const { setIsLoading } = useStore()

  useEffect(() => setIsLoading(false), [])
  
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
            <FooterCSR />
          </div>
          <LoaderSelfHandled />
        </div>
      }
    </ScrollToConsumer>
  )
}


export default AppLayout
