import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Main from './Main'


export async function generateMetadata() {
  return getMetadataFromContentful('/')
}


export default async function Page() {
  const { h1 } = await getMetadataFromContentful('/')

  return <Main h1={h1} />
}
