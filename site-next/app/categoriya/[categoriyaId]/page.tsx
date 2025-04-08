import type { AppProps } from 'next/app'

import { getContentfulDataWithoutBadItems } from '../../lib/hooks/useContentful'
import Loader from '../../lib/components/Loader'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Custom404 from '@/app/pages/404'
import Main from '@/app/Main'
 

type PageProps = {
  params: Promise<{ categoriyaId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: PageProps) {
  const URL = await getUrl(props)

  console.log(await props.searchParams)
  return getMetadataFromContentful(await getUrl(props))
}


export default async function Page(props: PageProps) {
  const searchParams = (await (await props).searchParams)
  const categoryLink = (await (await props).params).categoriyaId
  const contentful = await getContentfulDataWithoutBadItems()
  const { h1 } = await getMetadataFromContentful(await getUrl(props))
  
  if (!contentful)
    return <Loader />

  const category = contentful.categorys
    .find(category => category.link === categoryLink)

  if (!category)
    return <Custom404 {...(props.params as any as AppProps)} />

  return (
    <Main
      categoryLink={categoryLink}
      searchParams={searchParams}
      h1={h1}
    />
  )
}


const getUrl = async ({ params, searchParams }: PageProps) => {
  const { categoriyaId } = await params
  const searchString = Object.entries(searchParams).map(([key, value]) => `${key}=${value}`)
  const URL = `/categoriya/${decodeURIComponent(categoriyaId)}?${searchString}`

  return URL
}
