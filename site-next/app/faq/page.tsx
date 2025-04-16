import { redirect } from 'next/navigation'

import { getContentfulDataWithoutBadItems } from '../lib/hooks/useContentful'
import Loader from '../lib/components/Loader'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import PageTemplate from '../lib/components/PageTemplate'
import Custom404 from '../pages/404'
 

export async function generateMetadata() {
  return getMetadataFromContentful(await getUrl())
}


export default async function Page() {
  const contentful = await getContentfulDataWithoutBadItems()

  if (!contentful)
    return <Loader />

  const URL = await getUrl()

  const page = contentful.pages
    .find(page => page.link.link === URL)

  if (!page)
    // return <Custom404 />
    redirect('/404')

  return <PageTemplate {...page} />
}


const getUrl = async () => {
  return '/faq'
}
