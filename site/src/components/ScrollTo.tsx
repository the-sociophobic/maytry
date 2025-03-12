import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  useRef
} from 'react'

import useStore from '../hooks/useStore'


export type ScrollToContextType = {
  scrollTo: (_y: number) => void
  contentRef?: RefObject<HTMLDivElement | null>
}
const {
  Provider: ScrollToProvider,
  Consumer: ScrollToConsumer
} = createContext<ScrollToContextType>({
  scrollTo: (_y: number) => { },
  contentRef: undefined
})


export type ScrollToWrapperProps = {
  children: ReactNode
}

const ScrollToWrapper: FC<ScrollToWrapperProps> = ({
  children
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { setShowStartBanner } = useStore()

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
    <ScrollToProvider value={{
      scrollTo,
      contentRef
    }}>
      {children}
    </ScrollToProvider>
  )
}


export {
  ScrollToConsumer,
  ScrollToWrapper
}
