import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Register from './Register'


export async function generateMetadata() {
  return getMetadataFromContentful('/register')
}


export default async function Page() {
  return <Register />
}
