import { FC, useEffect, useRef, useState } from 'react'


import Button from '../../lib/components/Button'
import Img from '../../lib/components/Img'
import { ItemInfoCSR } from '../../lib/components/ItemInfo'
import { ImgDummyCSR } from '../../lib/components/ImgDummy'
import { FooterCSR } from '../../lib/components/Footer'
import useSyncCart from '../../lib/hooks/useSyncCart'
import dataLayer from '../../lib/utils/dataLayer'
import { CombinedItemType } from '../../lib/types/contentful.type'
import createCurrentItemInCartBlank from '@/app/lib/utils/createCurrentItemInCartBlank'
import ImgScrollerMobile from './ImgScrollerMobile'
import { CONTAINER_PADDINGS, HEADER_HEIGHT, IMAGE_HEIGHT, IMAGE_WIDTH } from './consts'


export type ItemProps = CombinedItemType


const Item: FC<ItemProps> = (item) => {
  const [zoomed, setZoomed] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const imagesAreaRef = useRef<HTMLDivElement>(null)
  const imagesAreaMobileRef = useRef<HTMLDivElement>(null)

  const itemInCart = createCurrentItemInCartBlank(item, 1)
  useEffect(() => {
    dataLayer({
      actionType: 'detail',
      items: itemInCart ? [itemInCart] : []
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

    const { children } = imagesAreaRef.current
    const currentImgNode = [...children]
      .find((_img, imgIndex) => imgIndex === imageIndex)

    if (currentImgNode) {
      scrollAreaRef.current
        .scrollTo(0, (currentImgNode as any).offsetTop - HEADER_HEIGHT)
    }
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

        <div className='row mobile-only'>
          <div
            className='col pe-4 overflow-hidden'
            ref={imagesAreaMobileRef}
          >
            <ImgDummyCSR
              img={item.images[0]}
              className='mb-2'
            />
            <ItemInfoCSR
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

          <ImgScrollerMobile
            item={item}
            imagesAreaMobileRef={imagesAreaMobileRef}
            scrollAreaRef={scrollAreaRef}
          />
        </div>

      </div>
      <FooterCSR />
    </div>
  )
}


export default Item
