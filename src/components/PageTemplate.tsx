import { FC } from 'react'
import { PageType } from '../hooks/useContentful/types'


export type PageTemplateProps = PageType


const PageTemplate: FC<PageTemplateProps> = ({
  // link,
  title,
  text,
  // items,
}) => {
  return (
    <div className='container'>
      <div className='row'>
        <h3 className='h3 mb-5'>
          {title}
        </h3>
        <p className='p'>
          {text}
        </p>
      </div>
    </div>
  )
}


export default PageTemplate
