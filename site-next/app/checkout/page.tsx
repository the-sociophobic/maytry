import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Checkout from './Checkout'


export async function generateMetadata() {
  return getMetadataFromContentful('/checkout')
}


export default async function Page() {
  return <Checkout />
}
