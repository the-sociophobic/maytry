import getMetadataFromContentful from '@/app/lib/utils/getMetadataFromContentful'
import Main from './Main'


export async function generateMetadata() {
  return getMetadataFromContentful('/')
}


export default async function Page() {
  return <Main />
}
