'use server'

import { FC } from 'react'

import { getContentfulDataWithoutBadItems } from '@/app/lib/hooks/useContentful'
import Breadcrumbs from './Breadcrumbs'


export type BreadcrumbsSSRProps = {
  pathname: string
}


const BreadcrumbsSSR: FC<BreadcrumbsSSRProps> = async ({
  pathname
}) => {
  const contentful = await getContentfulDataWithoutBadItems()

  return (
    <Breadcrumbs
      pathname={pathname}
      contentful={contentful}
    />
  )
}


export { BreadcrumbsSSR }
