import type { AppProps } from 'next/app'
import { redirect } from 'next/navigation'

import { getContentfulDataWithoutBadItems } from '../../lib/hooks/useContentful'
import Loader from '../../lib/components/Loader'
import ItemNoSSR from './ItemNoSSR'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Custom404 from '@/app/pages/404'
import Canonical from '@/app/lib/components/Canonical'
import ItemSSR from './ItemSSR'
 

type PageProps = {
  params: Promise<{ productId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps) {
  return getMetadataFromContentful('/product/' + (await params).productId)
}


export default async function Page({ params }: PageProps) {
  const { productId } = await params
  const contentful = await getContentfulDataWithoutBadItems()

  if (!contentful)
    return <Loader />

  const item = contentful.items.find(item => item.link === productId)

  if (!item)
    // return <Custom404 {...(params as any as AppProps)} />
    redirect('/404')

  return (
    <>
      <Canonical href={`/product/${productId}`} />
      <ItemNoSSR {...item} />
      {/* <ItemSSR {...item} /> */}
    </>
  )
}
