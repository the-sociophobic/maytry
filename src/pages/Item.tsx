import { FC, useState } from 'react'

import { ItemType } from '../hooks/useContentful/types'
import Img from '../components/Img'
import Button from '../components/Button'


export type ItemProps = ItemType


const Item: FC<ItemProps> = (item) => {
  const [zoomed, setZoomed] = useState(false)

  return (
    <div className='row'>
      {!zoomed &&
        <div className='col-3'>
          <div className='position-sticky pe-4' style={{ top: '100px' }}>
            <h3 className='h3 mb-5'>
              {item.name}
            </h3>
            <div className='mb-4'>
              Price: {item.price} RUB
            </div>
            <div className=''>
              {item.description}
            </div>
          </div>
        </div>
      }
      <div className={`col-${zoomed ? 6 : 3}`}>
        <div className='d-flex flex-column'>
          {item.images.map(image =>
            <div>
              <Img
                file={image}
                className={`mb-2 cursor-zoom-${zoomed ? 'out' : 'in'}`}
                onClick={() => setZoomed(!zoomed)}
              />
            </div>
          )}
        </div>
      </div>
      <div className='col-3'>
        <div className='position-sticky' style={{ top: '100px' }}>
          {item.images.map(image =>
            <Button
              onMouseOver={() => { }}
            >
              {image.title}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}


export default Item
