import Noindex from '../lib/components/Noindex'
import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Admin from './Admin'


export async function generateMetadata() {
  return getMetadataFromContentful('/admin')
}


export default async function Page() {
  return (
    <>
      <Noindex />
      <Admin />
    </>
  )
}
