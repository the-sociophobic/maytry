import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Cart from './Cart'


export async function generateMetadata() {
  return getMetadataFromContentful('/cart')
}


export default async function Page() {
  return <Cart />
}
