import Noindex from '../lib/components/Noindex'
import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Register from './Register'


export async function generateMetadata() {
  return getMetadataFromContentful('/register')
}


export default async function Page() {
  return (
    <>
      <Noindex />
      <Register />
    </>
  )
}
