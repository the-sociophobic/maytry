'use client'

import { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import useStore from '../../hooks/useStore'
import Color from '../Color'
import Price from '../Price'
import Button from '../Button'
import SizeSelector from '../SizeSelector'
import QuantitySelector from '../QuantitySelector'
import parseColors from '../../utils/parseColors'
import { CombinedItemType } from '../../types/contentful.type'
import AddNewLines from '../AddNewLines'
import yandexGoal from '../../utils/yandex/goal'
import { YANDEX_GOAL } from '../../utils/yandex/consts'
import SizesTable from '../SizesTable'
import Dropdown from '../Dropdown'
import createCurrentItemInCartBlank from '../../utils/createCurrentItemInCartBlank'
import { BreadcrumbsCSR } from '../Breadcrumbs'
import { isMobile } from 'react-device-detect'
import { printPrice } from '../../utils/price'

import dolyameImgSrc from '../../assets/images/dolyame.svg'
import Image from 'next/image'

export type ItemInfoCSRProps = CombinedItemType & {
  className?: string
}


const ItemInfoCSR: FC<ItemInfoCSRProps> = ({ className, ...item }) => {
  const colors = parseColors(item.color_price_size)
  const { currentColor } = useStore()
  const { setCurrentColor } = useStore()

  useEffect(() => {
    const defaultColor = colors.find(color => color.sizes.some(size => size.max_available > 0))

    setCurrentColor(defaultColor)
  }, [])

  const currentSizes = currentColor?.sizes || []
  const defaultSize = currentSizes.find(size => size.max_available > 0)
  const [currentSize, setCurrentSize] = useState(defaultSize)

  useEffect(() => {
    setCurrentSize(defaultSize)
  }, [currentColor])

  const { itemsInCart } = useStore()
  const currentItemInCartBlank = createCurrentItemInCartBlank(item, 0, currentSize, currentColor)
  const currentItemInCart = itemsInCart
    .find(itemInCart => itemInCart.id === currentSize?.id)
    || currentItemInCartBlank!
  const { setItemInCart } = useStore()

  const router = useRouter()

  const currentPrice = currentSize?.salePrice || currentSize?.price || item.defaultSalePrice || item.defaultPrice || 0

  return (
    <div className={className}>
      <div
        style={isMobile ? {} : {
          position: 'sticky',
          top: '0px',
          overflowX: 'hidden',
          // paddingLeft: '10px',          
          overflowY: 'scroll',
          maxHeight: 'calc(100vh - 70px)'
        }}
      >
        <BreadcrumbsCSR pathname={`/product/${item.link}/`} />

        <h3 className='h3 mb-4'>
          {item.metaH1}
        </h3>
        <div className='row mb-3'>

          <div className='col'>
            <SizeSelector
              sizes={currentSizes.map(size => ({
                ...size.size,
                available: size.max_available > 0
              }))}
              selectedIds={[currentSize?.size.id || '']}
              onChange={sizeId => setCurrentSize(currentSizes.find(size => size.size.id === sizeId))}
            />

            <div className='d-flex flex-row mt-3 mb-3'>
              <div className='me-3'>
                Цена:
              </div>
              <Price
                price={currentSize?.price || item.defaultPrice || 0}
                salePrice={currentSize?.salePrice || item.defaultSalePrice}
              />
            </div>

          </div>

          <div className='col'>
            <div className='d-flex flex-column mb-4'>
              {colors
                .map((colorSizes, colorSizesIndex) => {
                  const is_color_available = colorSizes?.sizes
                    .map(colorSize => colorSize.max_available > 0)
                    .reduce((a, b) => a || b, false)

                  return (
                    <div
                      key={colorSizesIndex}
                      className={`
                      d-flex flex-row mb-2 cursor-pointer
                      ${!is_color_available && 'text-disabled'}
                    `}
                      onClick={() => is_color_available && setCurrentColor(colorSizes)}
                    >
                      <Color
                        {...colorSizes.color!}
                        className='me-3'
                        selected={currentColor?.color?.id === colorSizes.color?.id}
                      />
                      {colorSizes.color?.name}
                    </div>
                  )
                })
              }
            </div>
          </div>

        </div>

        <div className='row'>
          <div className='col'>
            {currentItemInCart.quantity > 0 ?
              <QuantitySelector
                value={currentItemInCart.quantity}
                onChange={quantity => setItemInCart(currentItemInCart, quantity)}
                max={currentItemInCart.max_available}
              />
              :
              currentSize && currentSize?.max_available > 0 ?
                <>
                  <Button
                    black
                    className={``}
                    onClick={() => {
                      setItemInCart(currentItemInCart, 1)
                      yandexGoal({
                        goalId: YANDEX_GOAL.ADD_TO_CART,
                        order_price: currentPrice
                      })
                      router.push('/cart')
                    }}
                  >
                    В КОРЗИНУ
                  </Button>
                  <div className='d-flex flex-row mt-2'>
                    <Button
                      black
                      className={`me-2`}
                      onClick={() => {
                        setItemInCart(currentItemInCart, 1)
                        yandexGoal({
                          goalId: YANDEX_GOAL.ADD_TO_CART,
                          order_price: currentPrice
                        })
                        router.push('/cart')
                      }}
                    >
                      <Image
                        src={dolyameImgSrc}
                        className='DolyameImg'
                        alt='dolyame'
                        priority
                      />
                    </Button>
                    4 платежа по {printPrice(currentPrice / 4)}
                  </div>
                </>
                :
                ''
            }
          </div>
        </div>

        <div className='desktop-only mt-4 mb-5'>
          <SizesTable
            sizes={item.sizes}
          />
        </div>
        {item.sizes &&
          <div className='mobile-only mt-4 mb-5'>
            <Dropdown header={`Размерная таблица`}>
              <SizesTable
                sizes={item.sizes}
              />
            </Dropdown>
          </div>
        }

        <div className='ItemPage__description'>
          {/* <div className='h3'>
            {`Описание ${item.name}`}
          </div> */}
          <AddNewLines string={item.description} />
        </div>

      </div>
    </div>
  )
}


export { ItemInfoCSR }
