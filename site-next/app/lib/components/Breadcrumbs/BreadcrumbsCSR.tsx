'use client'

import { FC } from 'react'

import useContentful from '@/app/lib/hooks/useContentful'
import Breadcrumbs from './Breadcrumbs'


export type BreadcrumbsCSRProps = {
  pathname: string
}


const BreadcrumbsCSR: FC<BreadcrumbsCSRProps> = ({
  pathname
}) => {
  const { data: contentful } = useContentful()

  return !contentful ? <div /> : (
    <Breadcrumbs
      pathname={pathname}
      contentful={contentful}
    />
  )
}


export { BreadcrumbsCSR }
