import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Account from './Account'


export async function generateMetadata() {
  return getMetadataFromContentful('/account')
}


export default async function Page() {
  return <Account />
}
