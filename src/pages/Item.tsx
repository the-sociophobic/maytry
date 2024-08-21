import { FC, useEffect, useRef, useState } from 'react'

import { pick } from 'lodash'
import { useNavigate } from 'react-router-dom'

import { ItemType } from '../hooks/useContentful/types'
import parseColors from '../utils/parseColors'
import Button from '../components/Button'
import Color from '../components/Color'
import Img from '../components/Img'
import Price from '../components/Price'
import useStore from '../hooks/useStore'
import { ItemInCartType } from './Cart'


export type ItemProps = ItemType


const HEADER_HEIGHT = 80


const Item: FC<ItemProps> = (item) => {
  const [zoomed, setZoomed] = useState(false)

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
  const setColor = (colorIndex: number) => {
    setCurrentColorIndex(colorIndex)
    setCurrentSizeIndex(0)
  }
  const colors = parseColors(item.color_price_size)
  const currentColor = colors[currentColorIndex]
  const [currentSizeIndex, setCurrentSizeIndex] = useState<number>(0)
  const currentSize = currentColor?.sizes[currentSizeIndex]
  const { itemsInCart } = useStore()
  const currentItemInCartBlank: ItemInCartType = {
    ...item,
    ...currentSize,
    color: currentColor?.color,
    quantity: 0,
    id: currentSize?.id
  }
  const currentItemInCart = itemsInCart
    .find(itemInCart => itemInCart.id === currentSize?.id)
    || currentItemInCartBlank
  const { setItemInCart } = useStore()

  const navigate = useNavigate()

  return (
    <div
      ref={scrollAreaRef}
      className='ItemPage'
    >
      <div className='container-2'>
        <div className='row'>
          {!zoomed &&
            <div className='col-3'>
              <div className='position-sticky pe-4' style={{ top: '100px' }}>
                <h3 className='h3 mb-5'>
                  {item.name}
                </h3>
                <div className='mb-4'>

                  <div className='d-flex flex-column mb-4'>
                    {colors
                      .map((colorSizes, colorSizesIndex) => {
                        const available = colorSizes?.sizes
                          .map(colorSize => colorSize.max_available > 0)
                          .reduce((a, b) => a || b)

                        return (
                          <div
                            key={colorSizesIndex}
                            className={`
                              d-flex flex-row mb-2 cursor-pointer
                              ${!available && 'text-disabled'}
                            `}
                            onClick={() => available && setColor(colorSizesIndex)}
                          >
                            <Color
                              {...colorSizes.color!}
                              className='me-3'
                              selected={currentColorIndex === colorSizesIndex}
                            />
                            {colorSizes.color?.name}
                          </div>
                        )
                      })
                    }
                  </div>

                  <div className='d-flex flex-row mt-3'>
                    <div className='me-3'>
                      Размер:
                    </div>
                    {currentColor?.sizes.map((size, sizeIndex) =>
                      <div
                        key={size.id}
                        className={`
                          me-3 cursor-pointer
                          ${size.max_available === 0 && 'text-disabled'}
                          ${(sizeIndex === currentSizeIndex && size.max_available > 0) && 'text-underline'}
                        `}
                        onClick={() => size.max_available > 0 && setCurrentSizeIndex(sizeIndex)}
                      >
                        {size.size.name}
                      </div>
                    )}
                  </div>

                  <div className='d-flex flex-row mt-3 mb-4'>
                    <div className='me-3'>
                      Цена:
                    </div>
                    <Price {...(currentColor ?
                      pick(currentColor.sizes[currentSizeIndex], 'price', 'salePrice')
                      :
                      {
                        price: item.defaultPrice || 0,
                        salePrice: item.defaultSalePrice,
                      }
                    )} />
                  </div>

                  {currentItemInCart.quantity === 0 ?
                    currentSize?.max_available === 0 ? '' :
                      <Button
                        black
                        className={``}
                        onClick={() => {
                          setItemInCart(currentItemInCart, 1)
                          navigate('/cart')
                        }}
                      >
                        В КОРЗИНУ
                      </Button>
                    :
                    <div className='d-flex flex-row align-items-center'>
                      <Button
                        black
                        className={``}
                        onClick={() => setItemInCart(currentItemInCart, currentItemInCart.quantity - 1)}
                      >
                        -
                      </Button>
                      <div className='mx-3'>
                        {currentItemInCart.quantity}
                      </div>
                      {currentItemInCart.quantity < currentItemInCart.max_available &&
                        <Button
                          black
                          className={``}
                          onClick={() => setItemInCart(currentItemInCart, currentItemInCart.quantity + 1)}
                        >
                          +
                        </Button>
                      }
                    </div>
                  }

                </div>
                <div className='ItemPage__description'>
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
      </div>
    </div>
  )
}


export default Item
