'use client'

import { FC, RefObject, useRef, useState } from 'react'

import { CombinedItemType } from '@/app/lib/types/contentful.type'
import { HEADER_HEIGHT } from './consts'


export type ImgScrollerMobileProps = {
  item: CombinedItemType
  imagesAreaMobileRef: RefObject<HTMLDivElement | null>
  scrollAreaRef: RefObject<HTMLDivElement | null>
}


const ImgScrollerMobile: FC<ImgScrollerMobileProps> = ({
  item,
  imagesAreaMobileRef,
  scrollAreaRef
}) => {
  const touchScrollerRef = useRef<HTMLDivElement>(null)
  const [currentMobileImage, setCurrentMobileImage] = useState(-1)

  const scrollToImageMobile = (imageIndex: number) => {
    if (!imagesAreaMobileRef.current || !scrollAreaRef.current)
      return

    const { children } = imagesAreaMobileRef.current;
    const currentImgNode = [...children]
      .filter(child => child.classList.contains('Img'))
      .find((_img, imgIndex) => imgIndex === imageIndex)

    if (currentImgNode) {
      scrollAreaRef.current
        .scrollTo(0, (currentImgNode as any).offsetTop - HEADER_HEIGHT)
    }
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // e.preventDefault()
    const touch = e.changedTouches[0]
    const touchScroller = touchScrollerRef.current

    if (!touch || !touchScroller)
      return

    const progress = (touch.pageY - touchScroller.getBoundingClientRect().top) / touchScroller.clientHeight
    const numberOfPhoto = Math.floor(progress * item.images.length)

    scrollToImageMobile(numberOfPhoto)
    setCurrentMobileImage(numberOfPhoto)
  }
  const onTouchEnd = () => {
    setCurrentMobileImage(-1)
  }
  
  return (
    <div
      ref={touchScrollerRef}
      className='ImgScrollerMobile'
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {item.images.map((image, imageIndex) =>
        <div
          key={image.id}
          className='ImgScrollerMobile__line'
          onClick={() => scrollToImageMobile(imageIndex)}
        >
          {currentMobileImage === imageIndex &&
            <div className='ImgScrollerMobile__line__tooltip'>
              {image.title}
            </div>
          }
        </div>
      )}
    </div>
  )
}


export default ImgScrollerMobile
