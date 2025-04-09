import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Main from './Main'
import Canonical from './lib/components/Canonical'


export async function generateMetadata() {
  return getMetadataFromContentful('/')
}


export default async function Page() {
  const { h1 } = await getMetadataFromContentful('/')

  return (
    <>
      <Canonical href='/' />
      <Main h1={h1} />
    </>
  )
}
