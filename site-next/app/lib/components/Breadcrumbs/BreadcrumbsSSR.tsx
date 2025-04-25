'use server'

import { FC } from 'react'

import Breadcrumbs from './Breadcrumbs'
import contentful from '@/app/lib/utils/preloaded/contentful'


export type BreadcrumbsSSRProps = {
  pathname: string
}


const BreadcrumbsSSR: FC<BreadcrumbsSSRProps> = async ({
  pathname
}) => {
  return (
    <Breadcrumbs
      pathname={pathname}
      contentful={contentful}
    />
  )
}


export { BreadcrumbsSSR }
