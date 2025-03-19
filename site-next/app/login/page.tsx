import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Login from './Login'


export async function generateMetadata() {
  return getMetadataFromContentful('/login')
}


export default async function Page() {
  return <Login />
}
