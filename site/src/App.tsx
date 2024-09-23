import { useRef, createContext } from 'react'

import ProtectedRoutes from './components/ProtectedRoutes'
import QueryWrapper from './components/QueryWrapper'
import useStore from './hooks/useStore'


const {
  Provider: ScrollToProvider,
  Consumer: ScrollToConsumer
} = createContext({ scrollTo: (_y: number) => { } })

export { ScrollToConsumer }

function App() {
  const { setShowStartBanner } = useStore()
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

  return (
    <QueryWrapper>
      <div className='App'>
        <div className='content' ref={contentRef}>
          <ScrollToProvider value={{ scrollTo }}>
            <ProtectedRoutes contentRef={contentRef} />
          </ScrollToProvider>
        </div>
      </div>
    </QueryWrapper>
  )
}


export default App
