'use server'

import { FC } from 'react'

import { CombinedItemType } from '@/app/lib/types/contentful.type'
import ItemInfo from '@/app/lib/components/ItemInfo'
import Img from '@/app/lib/components/Img'
import { ImgDummySSR } from '@/app/lib/components/ImgDummy'
import Button from '@/app/lib/components/Button'
import Footer from '@/app/lib/components/Footer'


export type ItemSSRProps = CombinedItemType


const ItemSSR: FC<ItemSSRProps> = (item) => {
  return (
    <div
      className='ItemPage'
    >
      <h1 className='d-none'>
        {item.metaH1}
      </h1>
      <div className='container-2'>

        <div className='row desktop-only'>
          {/* <ItemInfo
            className='col pe-5'
            {...item}
          /> */}
          <div style={{
            flex: '0 0 auto',
            width: 300
          }}>
            <div
              className='d-flex flex-column'
            >
              {item.images.map((image, imageIndex) =>
                <Img
                  key={image.id}
                  file={image.small}
                  className={`ItemPage__Img mb-2 mx-auto cursor-zoom-${'in'}`}
                />
              )}
              {/* {item.images.length === 0 &&
                <ImgDummySSR
                  img={undefined}
                  className={`mb-2 cursor-zoom-${'in'}`}
                />
              } */}
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
              {/* {item.images.map((image, imageIndex) =>
                <Button
                  key={image.id + '_anchor'}
                  className={`ImgTooltipDesktop`}
                >
                  {image.title}
                </Button>
              )} */}
            </div>
          </div>
        </div>

        <div className='row mobile-only'>
          <div
            className='col pe-4 overflow-hidden'
          >
            {/* <ImgDummySSR
              img={item.images[0]}
              className='mb-2'
            /> */}
            {/* <ItemInfo
              className='mb-5'
              {...item}
            /> */}
            {item.images.slice(1).map(image =>
              <Img
                key={image.id}
                file={image.small}
                className={`mb-2`}
              />
            )}
          </div>
        </div>

      </div>
      {/* <Footer /> */}
    </div>
  )
}


export default ItemSSR
