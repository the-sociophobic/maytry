import { FC, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'


import Button from '../../lib/components/Button'
import Img from '../../lib/components/Img'
import { ItemInfoCSR } from '../../lib/components/ItemInfo'
import { ImgDummyCSR } from '../../lib/components/ImgDummy'
import { FooterCSR } from '../../lib/components/Footer'
import useSyncCart from '../../lib/hooks/useSyncCart'
import dataLayer from '../../lib/utils/dataLayer'
import { CombinedItemType } from '../../lib/types/contentful.type'
import createCurrentItemInCartBlank from '@/app/lib/utils/createCurrentItemInCartBlank'
import { CONTAINER_PADDINGS, HEADER_HEIGHT, IMAGE_HEIGHT, IMAGE_WIDTH } from './consts'
import useStore from '@/app/lib/hooks/useStore'


export type ItemProps = CombinedItemType


const Item: FC<ItemProps> = (item) => {
  const [zoomed, setZoomed] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const scrollAreaMobileRef = useRef<HTMLDivElement>(null)
  const imagesAreaRef = useRef<HTMLDivElement>(null)
  const imagesAreaMobileRef = useRef<HTMLDivElement>(null)
  const touchScrollerRef = useRef<HTMLDivElement>(null)

  const itemInCart = createCurrentItemInCartBlank(item, 1)
  useEffect(() => {
    dataLayer({
      actionType: 'detail',
      items: itemInCart ? [itemInCart] : []
    })
  }, [])

  useEffect(() => {
    const scrollArea = isMobile ? scrollAreaMobileRef.current : scrollAreaRef.current

    if (!scrollArea)
      return

    scrollArea.addEventListener('scroll', e => {
      const imagesArea = isMobile ? imagesAreaMobileRef.current : imagesAreaRef.current

      if (!imagesArea)
        return

      const { scrollTop, scrollLeft } = e.target as HTMLElement
      const { children } = imagesArea
      let minOffset = 1000
      let currentImageIndex = 0;

      [...children].forEach((img: any, imgIndex) => {
        const offset = isMobile ?
          Math.abs(img.offsetLeft - scrollLeft)
          :
          Math.abs(img.offsetTop - HEADER_HEIGHT - scrollTop)

        if (offset < minOffset) {
          minOffset = offset
          currentImageIndex = imgIndex
        }
      })

      setCurrentImage(currentImageIndex)
    })
  }, [
    isMobile,
    scrollAreaMobileRef,
    scrollAreaRef
  ])

  const scrollToImage = (imageIndex: number) => {
    const scrollArea = isMobile ? scrollAreaMobileRef.current : scrollAreaRef.current
    const imagesArea = isMobile ? imagesAreaMobileRef.current : imagesAreaRef.current

    if (!imagesArea || !scrollArea)
      return

    const { children } = imagesArea
    const currentImgNode = [...children]
      .find((_img, imgIndex) => imgIndex === imageIndex)

    if (currentImgNode) {
      if (isMobile) {
        scrollArea
          .scrollTo((currentImgNode as any).offsetLeft - 25, 0)
      } else {
        scrollArea
          .scrollTo(0, (currentImgNode as any).offsetTop - HEADER_HEIGHT)
      }
    }
  }
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // e.preventDefault()
    const touch = e.changedTouches[0]
    const touchScroller = touchScrollerRef.current

    if (!touch || !touchScroller)
      return

    const progress = (touch.pageX - touchScroller.getBoundingClientRect().left) / touchScroller.clientWidth
    const numberOfPhoto = Math.floor(progress * item.images.length) + 1

    scrollToImage(numberOfPhoto)
    // setCurrentMobileImage(numberOfPhoto)
  }

  const { currentColor } = useStore()
  useEffect(() => {
    if (currentColor) {
      const imageIndex = item.images.findIndex(image =>
        image.title.toLowerCase().includes(currentColor.color?.name?.toLocaleLowerCase?.() || '---'))

      if (imageIndex >= 0) {
        scrollToImage(imageIndex)
      }
    }
  }, [currentColor])

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
            <ItemInfoCSR
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
                <ImgDummyCSR
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

        <div
          ref={scrollAreaMobileRef}
          className='mobile-only overflow-y-visible overflow-x-scroll'
        >
          <div
            className='d-flex flex-row overflow-y-visible mb-3'
            style={{
              width: 'fit-content',
              height: 'fit-content'
            }}
            ref={imagesAreaMobileRef}
          >
            {/* <ImgDummyCSR
              img={item.images[0]}
              className='mb-2'
            /> */}
            {item.images.map(image =>
              <Img
                key={image.id}
                file={image.small}
                className={`me-4`}
                style={{
                  width: '90vw',
                }}
              />
            )}

            {/* {item.images.slice(1).map(image =>
              <Img
              key={image.id}
              file={image.small}
              className={`mb-2`}
              />
              )} */}
          </div>
        </div>
        <div className='mobile-only'>
          <div
            className='ImgScrollerMobileNew d-flex flex-row mx-auto'
            style={{
              width: 'fit-content'
            }}
            ref={touchScrollerRef}
            onTouchMove={onTouchMove}
          >
            {item.images.map((image, imageIndex) =>
              <div
                key={imageIndex}
                className={`
                  ImgScrollerMobileNew__square
                  ${imageIndex === currentImage && 'ImgScrollerMobileNew__square--selected'}
                `}
                onClick={() => scrollToImage(imageIndex)}
              />
            )}
          </div>
          <ItemInfoCSR
            className='mb-5 mt-3'
            {...item}
          />
        </div>

      </div>
      <FooterCSR />
    </div>
  )
}


export default Item
