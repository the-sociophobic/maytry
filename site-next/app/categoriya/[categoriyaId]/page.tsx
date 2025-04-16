import type { AppProps } from 'next/app'
import { redirect } from 'next/navigation'

import { getContentfulDataWithoutBadItems } from '../../lib/hooks/useContentful'
import Loader from '../../lib/components/Loader'
import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Custom404 from '@/app/pages/404'
import Main from '@/app/Main'
import Canonical from '@/app/lib/components/Canonical'
import Noindex from '@/app/lib/components/Noindex'
 

type PageProps = {
  params: Promise<{ categoriyaId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: PageProps) {
  return getMetadataFromContentful(await getUrl(props))
}


export default async function Page(props: PageProps) {
  const searchParams = (await (await props).searchParams)
  const categoryLink = (await (await props).params).categoriyaId
  const contentful = await getContentfulDataWithoutBadItems()
  const URL = await getUrl(props)
  const { h1 } = await getMetadataFromContentful(URL)
  
  if (!contentful)
    return <Loader />

  const category = contentful.categorys
    .find(category => category.link === categoryLink)

  if (!category)
    // return <Custom404 {...(props.params as any as AppProps)} />
    redirect('/404')

  return (
    <>
      {Object.entries(searchParams).length > 0 ?
        <Noindex />
        :
        <Canonical href={URL} />
      }
      <Main
        categoryLink={categoryLink}
        searchParams={searchParams}
        h1={h1}
      />
    </>
  )
}


const getUrl = async ({ params, searchParams }: PageProps) => {
  const { categoriyaId } = await params
  const searchString = Object.entries(await searchParams).map(([key, value]) => `${key}=${value}`)
  const URL = `/categoriya/${decodeURIComponent(categoriyaId)}?${searchString}`

  return URL
}
