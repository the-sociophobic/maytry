import { FC, useEffect, useRef, useState } from 'react'


import { ItemType } from '../hooks/useContentful/types'
import Button from '../components/Button'
import Img from '../components/Img'
import ItemInfo from '../components/ItemInfo'


export type ItemProps = ItemType


const HEADER_HEIGHT = 80


const Item: FC<ItemProps> = (item) => {
  const [zoomed, setZoomed] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const imagesAreaRef = useRef<HTMLDivElement>(null)
  const imagesAreaMobileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollAreaRef.current)
      return

    scrollAreaRef.current.addEventListener('scroll', e => {
      if (!imagesAreaRef.current)
        return

      const { scrollTop } = e.target as HTMLElement
      const { children } = imagesAreaRef.current
      let minOffset = 1000
      let currentImageIndex = 0;

      [...children].forEach((img: any, imgIndex) => {
        const offset = Math.abs(img.offsetTop - HEADER_HEIGHT - scrollTop)

        if (offset < minOffset) {
          minOffset = offset
          currentImageIndex = imgIndex
        }
      })

      setCurrentImage(currentImageIndex)
    })
  }, [scrollAreaRef.current])

  const scrollToImage = (imageIndex: number) => {
    if (!imagesAreaRef.current || !scrollAreaRef.current)
      return

    const { children } = imagesAreaRef.current;
    const currentImgNode = [...children]
      .find((_img, imgIndex) => imgIndex === imageIndex)

    if (currentImgNode) {
      scrollAreaRef.current
        .scrollTo(0, (currentImgNode as any).offsetTop - HEADER_HEIGHT)
    }
  }
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

  return (
    <div
      ref={scrollAreaRef}
      className='ItemPage'
    >
      <div className='container-2'>

        <div className='row desktop-only'>
          {!zoomed &&
            <ItemInfo
              className='col-3'
              {...item}
            />
          }
          <div className={`col-${zoomed ? 6 : 3}`}>
            <div
              ref={imagesAreaRef}
              className='d-flex flex-column'
            >
              {item.images.map((image, imageIndex) =>
                <Img
                  key={image.id}
                  file={zoomed ? (image.large || image.small) : image.small}
                  className={`mb-2 cursor-zoom-${zoomed ? 'out' : 'in'}`}
                  onClick={() => {
                    setZoomed(!zoomed)
                    setTimeout(() => scrollToImage(imageIndex), 25)
                  }}
                />
              )}
            </div>
          </div>
          <div className='col-3'>
            <div className='position-sticky' style={{ top: '100px' }}>
              {item.images.map((image, imageIndex) =>
                <Button
                  key={image.id + '_anchor'}
                  className={imageIndex === currentImage && 'text-underline'}
                  onMouseOver={() => scrollToImage(imageIndex)}
                >
                  {image.title}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className='row mobile-only'>
          <div
            className='col'
            ref={imagesAreaMobileRef}
          >
            {item.images[0] &&
              <Img
                file={item.images[0].small}
                className={`mb-2`}
              />
            }
            <ItemInfo
              className='mb-5'
              {...item}
            />
            {item.images.slice(1).map(image =>
              <Img
                key={image.id}
                file={image.small}
                className={`mb-2`}
              />
            )}
          </div>
          <div className='col-1'>
            <div className='position-sticky' style={{top: '30px'}}>
              {item.images.map((image, imageIndex) =>
                <div
                  key={image.id}
                  className='ItemPage__ImgSelectorMobile'
                  onClick={() => scrollToImageMobile(imageIndex)}
                />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


export default Item
