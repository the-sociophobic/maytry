import { getContentfulDataWithoutBadItems } from '../../lib/hooks/useContentful'
import Loader from '../../lib/components/Loader'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import PageTemplate from '@/app/lib/components/PageTemplate'
 

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
    return <Loader />

  return <PageTemplate {...page} />
}


const getUrl = async ({ params }: PageProps) => {
  const { pageId } = await params
  const URL = '/faq/' + pageId

  return URL
}