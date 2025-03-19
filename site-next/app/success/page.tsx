import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Success from './Success'


export async function generateMetadata() {
  return getMetadataFromContentful('/success')
}


export default async function Page() {
  return <Success />
}
