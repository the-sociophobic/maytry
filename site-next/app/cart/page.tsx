import Noindex from '../lib/components/Noindex'
import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import Cart from './Cart'


export async function generateMetadata() {
  return getMetadataFromContentful('/cart')
}


export default async function Page() {
  const { h1 } = await getMetadataFromContentful('/cart')

  return (
    <>
      <Noindex />
      <Cart h1={h1} />
    </>
  )
}
