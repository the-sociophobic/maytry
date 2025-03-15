import { useRef, createContext, useEffect, RefObject } from 'react'

import ProtectedRoutes from './components/ProtectedRoutes'
import useStore from './hooks/useStore'
import Loader from './components/Loader'

import './assets/styles/index.sass'


export type ScrollToContextType = {
  scrollTo: (_y: number) => void
  contentRef?: RefObject<HTMLDivElement>
}
const {
  Provider: ScrollToProvider,
  Consumer: ScrollToConsumer
} = createContext<ScrollToContextType>({
  scrollTo: (_y: number) => { },
  contentRef: undefined
})

export { ScrollToConsumer }

function App() {
  const { setShowStartBanner } = useStore()
  const { setIsLoading } = useStore()
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollTo = (y: number) => {
    let scrollFrameCount = 0
    const scrollFrame = () => {
      if (!contentRef.current)
        return

      const y_modified = y - 80
      const { scrollTop } = contentRef.current
      const scrollToCurrent = Math.floor(scrollTop + (y_modified - scrollTop) * .25)

      contentRef.current.scrollTo(0, scrollToCurrent)

      if (Math.abs(scrollTop - y_modified) > 3 && scrollFrameCount < 7) {
        scrollFrameCount += 1
        requestAnimationFrame(scrollFrame)
      }
      else
        setShowStartBanner(false)
    }
    requestAnimationFrame(scrollFrame)
  }
  
  useEffect(() => {
    setShowStartBanner(true)
    setIsLoading(false)
  }, [
    setShowStartBanner,
    setIsLoading
  ])

  return (
    <div className='App'>
      <div className='content' ref={contentRef}>
        <ScrollToProvider value={{
          scrollTo,
          contentRef
        }}>
          <ProtectedRoutes />
        </ScrollToProvider>
      </div>
      <Loader />
    </div>
  )
}


export default App
