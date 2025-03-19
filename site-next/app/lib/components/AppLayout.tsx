'use client'
 
import { FC, ReactNode, useEffect } from 'react'

import { ScrollToConsumer } from './ScrollTo'
import useStore from '../hooks/useStore'
import Header from './Header'
import Footer from './Footer'
import Loader from './Loader'
import useUser from '../hooks/user/useUser'


export type AppLayoutProps = {
  children: ReactNode
}


const AppLayout: FC<AppLayoutProps> = ({
  children
}) => {
  const { isLoading } = useStore()
  const { data: user, isLoading: userIsLoading } = useUser()
  const { logged } = useStore()
  const { setLogged } = useStore()
  
  useEffect(() => {
    if (userIsLoading)
      return
  
    if (logged !== !!user)
      setLogged(!!user)
  }, [logged, setLogged, user, userIsLoading])

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
          {isLoading && <Loader />}
        </div>
      }
    </ScrollToConsumer>
  )
}


export default AppLayout
