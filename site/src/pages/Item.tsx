import { FC, useEffect, useRef, useState } from 'react'


import Button from '../components/Button'
import Img from '../components/Img'
import ItemInfo from '../components/ItemInfo'
import ImgDummy from '../components/ImgDummy'
import { CombinedItemType } from '../types/contentful.type'
import Footer from '../components/Footer'
import useSyncCart from '../hooks/useSyncCart'
import dataLayer from '../utils/dataLayer'
import useCurrentItemInCartBlank from '../hooks/useCurrentItemInCartBlank'


export type ItemProps = CombinedItemType


const HEADER_HEIGHT = 70
const IMAGE_WIDTH = 1120
const IMAGE_HEIGHT = 1680
const CONTAINER_PADDINGS = 30


const Item: FC<ItemProps> = (item) => {
  const [zoomed, setZoomed] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const imagesAreaRef = useRef<HTMLDivElement>(null)
  const imagesAreaMobileRef = useRef<HTMLDivElement>(null)

  const itemInCart = useCurrentItemInCartBlank(item, 1)
  useEffect(() => {
    dataLayer({
      actionType: 'detail',
      items: [itemInCart]
    })
  }, [])

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
  }, [scrollAreaRef])

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

  const touchScrollerRef = useRef<HTMLDivElement>(null)
  const [currentMobileImage, setCurrentMobileImage] = useState(-1)
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

  const syncCart = useSyncCart()
  syncCart()

  const desiredImageWidth = (document.body.clientHeight - HEADER_HEIGHT) / IMAGE_HEIGHT * IMAGE_WIDTH
  const containerInnerWidth = document.body.clientWidth - CONTAINER_PADDINGS
  const desktopImageColWidth = zoomed ? '66.5%' : `${desiredImageWidth / containerInnerWidth * 100}%`

  return (
    <div
      ref={scrollAreaRef}
      className='ItemPage'
    >
      <div className='container-2'>

        <div className='row desktop-only'>
          {!zoomed &&
            <ItemInfo
              className='col pe-5'
              {...item}
            />
          }
          <div style={{
            flex: '0 0 auto',
            width: desktopImageColWidth
          }}>
            <div
              ref={imagesAreaRef}
              className='d-flex flex-column'
            >
              {item.images.map((image, imageIndex) =>
                <Img
                  key={image.id}
                  file={zoomed ? (image.large || image.small) : image.small}
                  className={`ItemPage__Img mb-2 mx-auto cursor-zoom-${zoomed ? 'out' : 'in'}`}
                  onClick={() => {
                    setZoomed(!zoomed)
                    setTimeout(() => scrollToImage(imageIndex), 25)
                  }}
                />
              )}
              {item.images.length === 0 &&
                <ImgDummy
                  img={undefined}
                  className={`mb-2 cursor-zoom-${zoomed ? 'out' : 'in'}`}
                  onClick={() => {
                    setZoomed(!zoomed)
                    setTimeout(() => scrollToImage(0), 25)
                  }}
                />
              }
            </div>
          </div>
          <div className='col'>
            <div
              className='position-sticky'
              style={{
                top: '0px',
                overflowX: 'hidden',
                paddingLeft: '10px',          
                overflowY: 'scroll',
                maxHeight: 'calc(100vh - 70px)'
              }}
            >
              {item.images.map((image, imageIndex) =>
                <Button
                  key={image.id + '_anchor'}
                  className={`ImgTooltipDesktop ${imageIndex === currentImage && 'text-underline'}`}
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
            className='col pe-4 overflow-hidden'
            ref={imagesAreaMobileRef}
          >
            <ImgDummy
              img={item.images[0]}
              className='mb-2'
            />
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

          {/* <div className='col-1 overflow-hidden'> */}
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
          {/* </div> */}

        </div>

      </div>
      <Footer />
    </div>
  )
}


export default Item
