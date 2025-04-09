import Noindex from '../lib/components/Noindex'
import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Checkout from './Checkout'


export async function generateMetadata() {
  return getMetadataFromContentful('/checkout')
}


export default async function Page() {
  const { h1 } = await getMetadataFromContentful('/checkout')

  return (
    <>
      <Noindex />
      <Checkout h1={h1} />
    </>
  )
}
