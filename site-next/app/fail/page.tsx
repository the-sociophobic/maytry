import Noindex from '../lib/components/Noindex'
import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Fail from './Fail'


export async function generateMetadata() {
  return getMetadataFromContentful('/fail')
}


export default async function Page() {
  return (
    <>
      <Noindex />
      <Fail />
    </>
  )
}
