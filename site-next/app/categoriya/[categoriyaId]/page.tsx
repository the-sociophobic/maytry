import type { AppProps } from 'next/app'

import { getContentfulDataWithoutBadItems } from '../../lib/hooks/useContentful'
import Loader from '../../lib/components/Loader'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Custom404 from '@/app/pages/404'
import Main from '@/app/Main'
 

type PageProps = {
  params: Promise<{ categoriyaId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps) {
  return getMetadataFromContentful('/product/' + (await params).categoriyaId)
}


export default async function Page({ params }: PageProps & AppProps) {
  const { categoriyaId } = await params
  const categoryId = decodeURIComponent(categoriyaId)
  const contentful = await getContentfulDataWithoutBadItems()

  if (!contentful)
    return <Loader />

  const category = contentful.categorys
    .find(category => category.name === categoryId)

  if (!category)
    return <Custom404 {...(params as any as AppProps)} />

  return <Main />
}
