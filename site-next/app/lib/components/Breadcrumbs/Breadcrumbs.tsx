// 'use client'

import Link from 'next/link'

import { FC } from 'react'

import { parsePathname } from './parse'
import { ContentfulDataTypeFE } from '../../types/contentful.type'


export type BreadcrumbsProps = {
  pathname: string
  contentful: ContentfulDataTypeFE
}


const Breadcrumbs: FC<BreadcrumbsProps> = ({
  pathname,
  contentful
}) => {
  const breadcrumbs = contentful ? parsePathname(pathname, contentful) : []

  return breadcrumbs.length < 2 ? <></> : (
    <div className='mb-4'>
      {breadcrumbs.map((breadcrumb, breadcrumbIndex) =>
        breadcrumbIndex < breadcrumbs.length - 1 ?
          <Link
            href={breadcrumb.href}
            className='text-black'
          >
            {breadcrumb.label}
          </Link>
          :
          breadcrumb.label
      ).reduce((a, b) => <>{a}<p className='d-inline-block ms-3 me-3'> / </p>{b}</>)}
    </div>
  )
}


export default Breadcrumbs
