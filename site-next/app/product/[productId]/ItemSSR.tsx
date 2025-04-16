'use server'

import { FC } from 'react'

import { ItemInfoSSR } from '../../lib/components/ItemInfo'
import { ImgDummySSR } from '../../lib/components/ImgDummy'
import { CombinedItemType } from '../../lib/types/contentful.type'
import { FooterSSR } from '@/app/lib/components/Footer'


export type ItemSSRProps = CombinedItemType


const ItemSSR: FC<ItemSSRProps> = (item) => {
  const zoomed = false
  const currentImage = 0

  return (
    <div
      className='ItemPage server-only'
    >
      <div className='container-2'>

        <div className='row desktop-only'>
          {!zoomed &&
            <ItemInfoSSR
              className='col pe-5'
              {...item}
            />
          }
          <div style={{
            flex: '0 0 auto',
            width: 300
          }}>
            <div
              className='d-flex flex-column'
            >
              {item.images.map((image, imageIndex) =>
                <img
                  key={image.id}
                  src={zoomed ? (image.large?.file.url || image.small.file.url) : image.small.file.url}
                  className={`ItemPage__Img mb-2 mx-auto cursor-zoom-${zoomed ? 'out' : 'in'}`}
                />
              )}
              {item.images.length === 0 &&
                <ImgDummySSR
                  img={undefined}
                  className={`mb-2 cursor-zoom-${zoomed ? 'out' : 'in'}`}
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
                <div
                  key={image.id + '_anchor'}
                  className={`ImgTooltipDesktop ${imageIndex === currentImage && 'text-underline'}`}
                >
                  {image.title}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='row mobile-only'>
          <div
            className='col pe-4 overflow-hidden'
          >
            <ImgDummySSR
              img={item.images[0]}
              className='mb-2'
            />
            {/* <ItemInfoSSR
              className='mb-5'
              {...item}
            /> */}
            {item.images.slice(1).map(image =>
              <img
                key={image.id}
                src={image.small.file.url}
                className={`mb-2`}
              />
            )}
          </div>

          {/* <ImgScrollerMobile
            item={item}
            imagesAreaMobileRef={imagesAreaMobileRef}
            scrollAreaRef={scrollAreaRef}
          /> */}
        </div>

      </div>
      <FooterSSR />
    </div>
  )
}


export default ItemSSR
