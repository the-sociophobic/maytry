import { redirect } from 'next/navigation'

import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import PageTemplate from '../lib/components/PageTemplate'
import contentful from '@/app/lib/utils/preloaded/contentful'


export async function generateMetadata() {
  return getMetadataFromContentful(await getUrl())
}


export default async function Page() {
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
