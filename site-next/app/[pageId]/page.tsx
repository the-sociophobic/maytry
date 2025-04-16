import type { AppProps } from 'next/app'
import { redirect } from 'next/navigation'

import { getContentfulDataWithoutBadItems } from '../lib/hooks/useContentful'
import Loader from '../lib/components/Loader'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Custom404 from '@/app/pages/404'
import PageTemplate from '../lib/components/PageTemplate'
 

type PageProps = {
  params: Promise<{ pageId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: PageProps) {
  return getMetadataFromContentful(await getUrl(props))
}


export default async function Page(props: PageProps) {
  const contentful = await getContentfulDataWithoutBadItems()
  
  if (!contentful)
    return <Loader />

  const URL = await getUrl(props)
  const page = contentful.pages
    .find(page => page.link.link === URL)

  if (!page)
    // return <Custom404 {...(props.params as any as AppProps)} />
    redirect('/404')

  return <PageTemplate {...page} />
}


const getUrl = async ({ params }: PageProps) => {
  const { pageId } = await params
  const URL = '/' + pageId

  return URL
}