import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Fail from './Fail'


export async function generateMetadata() {
  return getMetadataFromContentful('/fail')
}


export default async function Page() {
  return <Fail />
}
