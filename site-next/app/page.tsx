import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Main from './Main'
import Canonical from './lib/components/Canonical'
import MainSSR from './MainSSR'


export async function generateMetadata() {
  return getMetadataFromContentful('/')
}


export default async function Page() {
  const { h1 } = await getMetadataFromContentful('/')

  return (
    <>
      <Canonical href='/' />
      <Main h1={h1} />
      <MainSSR h1={h1} />
    </>
  )
}
