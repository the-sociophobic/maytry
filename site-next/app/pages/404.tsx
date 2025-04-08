import type { AppProps } from 'next/app'

import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import { FC } from 'react'


export async function generateMetadata() {
  return getMetadataFromContentful('/404')
}


export type Custom404Props = Partial<AppProps>


const Custom404: FC<Custom404Props> = ({
  // Component,
  // pageProps
}) => {
  return (
    <div className='container-2'>
      <h3 className='h3'>404 - Page Not Found</h3>
    </div>
  )
}


export default Custom404
