import { FC } from 'react'

import { ContentfulPageType } from '../lib/types/contentful.type'
import Img from '../lib/components/Img'
import AddNewLines from '../lib/components/AddNewLines'


export type PageTemplateProps = ContentfulPageType


const PageTemplate: FC<PageTemplateProps> = ({
  // link,
  title,
  image,
  text,
  // items,
}) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col col-md-6 col-lg-3'>
          <h3 className='h3 font-bold mb-5'>
            {title}
          </h3>
          <Img
            className={'w-100'}
            file={image}
          />
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col'>
          {text &&
            <AddNewLines
              string={text}
              className='h3'
            />
          }
        </div>
      </div>
    </div>
  )
}


export default PageTemplate
