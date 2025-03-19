'use client'

import { useParams } from 'next/navigation'

import useContentful from '../../lib/hooks/useContentful'
import Loader from '../../lib/components/Loader'
import PageTemplate from './PageTemplate'
 

export default function Page() {
  const { pageId } = useParams() as { pageId: string }
  const { data: contentful } = useContentful()

  if (!contentful)
    return <Loader />

  const page = contentful.pages.find(page => page.link.link.replace('/', '') === pageId)

  if (!page)
    return <Loader />

  return <PageTemplate {...page} />
}
