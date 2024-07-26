import { FC, useEffect, useRef, useState } from 'react'

import { ItemType } from '../hooks/useContentful/types'
import Img from '../components/Img'
import Button from '../components/Button'
import parseColors from '../utils/parseColors'
import Color from '../components/Color'


export type ItemProps = ItemType


const HEADER_HEIGHT = 80


const Item: FC<ItemProps> = (item) => {
  const [zoomed, setZoomed] = useState(false)
  const colors = parseColors(item.color_price_size)

  const [currentImage, setCurrentImage] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const imagesAreaRef = useRef<HTMLDivElement>(null)

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

  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const currentColor = colors[currentColorIndex]

  return (
    <div
      ref={scrollAreaRef}
      className='ItemPage'
    >
      <div className='container'>
        <div className='row'>
          {!zoomed &&
            <div className='col-3'>
              <div className='position-sticky pe-4' style={{ top: '100px' }}>
                <h3 className='h3 mb-5'>
                  {item.name}
                </h3>
                <div className='mb-4'>
                  <div className='d-flex flex-row'>
                    {colors
                      .map((colorSizes, colorSizesIndex) =>
                        <Color
                          {...colorSizes.color!}
                          className='me-3'
                          onClick={() => setCurrentColorIndex(colorSizesIndex)}
                          selected={currentColorIndex === colorSizesIndex}
                        />
                      )
                    }
                  </div>
                  <div className='d-flex flex-row mt-3'>
                    {currentColor.sizes.map(size =>
                      <div className='me-3'>
                        {size.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className=''>
                  {item.description}
                </div>
              </div>
            </div>
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
                  className={imageIndex === currentImage && 'text-underline'}
                  key={image.id + '_anchor'}
                  onMouseOver={() => scrollToImage(imageIndex)}
                >
                  {image.title}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Item
