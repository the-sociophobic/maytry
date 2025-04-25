import { redirect } from 'next/navigation'

import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Main from '@/app/Main'
import MainSSR from '@/app/MainSSR'
import contentful from '@/app/lib/utils/preloaded/contentful'


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
  const URL = await getUrl(props)
  const { h1 } = await getMetadataFromContentful(URL)
  
  const category = contentful.categorys
    .find(category => category.link === categoryLink)

  if (!category)
    // return <Custom404 {...(props.params as any as AppProps)} />
    redirect('/404')

  return (
    <>
      <Main
        categoryLink={categoryLink}
        searchParams={searchParams}
        h1={h1}
      />
      <MainSSR
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
