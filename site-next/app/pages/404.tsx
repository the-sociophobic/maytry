import type { AppProps } from 'next/app'

import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'


export async function generateMetadata() {
  return getMetadataFromContentful('/404')
}


function Custom404({
  // Component,
  // pageProps
}: AppProps) {
  return (
    <div className='container-2'>
      <h3 className='h3'>404 - Page Not Found</h3>
    </div>
  )
}


export default Custom404
