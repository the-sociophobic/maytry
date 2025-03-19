import { getContentfulDataWithoutBadItems } from '../../lib/hooks/useContentful'
import Loader from '../../lib/components/Loader'
import PageTemplate from './PageTemplate'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
 

type PageProps = {
  params: Promise<{ pageId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps) {
  return getMetadataFromContentful('/page/' + (await params).pageId)
}


export default async function Page({ params }: PageProps) {
  const { pageId } = await params
  const contentful = await getContentfulDataWithoutBadItems()

  if (!contentful)
    return <Loader />

  const page = contentful.pages.find(page => page.link.link.replace('/', '') === pageId)

  if (!page)
    return <Loader />

  return <PageTemplate {...page} />
}
