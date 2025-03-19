import { getContentfulDataWithoutBadItems } from '../../lib/hooks/useContentful'
import Loader from '../../lib/components/Loader'
import ItemNoSSR from './ItemNoSSR'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
 

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
    return <Loader />

  return <ItemNoSSR {...item} />
}
