import type { AppProps } from 'next/app'
import { redirect } from 'next/navigation'

import ItemNoSSR from './ItemNoSSR'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import ItemSSR from './ItemSSR'
import contentful from '@/app/lib/utils/preloaded/contentful'


type PageProps = {
  params: Promise<{ productId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps) {
  return getMetadataFromContentful('/product/' + (await params).productId)
}


export default async function Page({ params }: PageProps) {
  const { productId } = await params
  const item = contentful.items.find(item => item.link === productId)

  if (!item)
    // return <Custom404 {...(params as any as AppProps)} />
    redirect('/404')

  return (
    <>
      <ItemNoSSR {...item} />
      <ItemSSR {...item} />
    </>
  )
}
