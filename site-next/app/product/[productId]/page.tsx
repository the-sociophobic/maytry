'use client'

import { useParams } from 'next/navigation'

import useContentful from '../../lib/hooks/useContentful'
import Loader from '../../lib/components/Loader'
import Item from './Item'
 

export default function Page() {
  const { productId } = useParams() as { productId: string }
  const { data: contentful } = useContentful()

  if (!contentful)
    return <Loader />

  const item = contentful.items.find(item => item.link === productId)

  if (!item)
    return <Loader />

  return <Item {...item} />
}
