import type { AppProps } from 'next/app'

import getMetadataFromContentful from '../lib/utils/getMetadataFromContentful'
import { FC } from 'react'
import Noindex from '../lib/components/Noindex'


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
      <Noindex />
      <h3 className='h3'>Ошибка 404 – Страница не найдена</h3>
    </div>
  )
}


export default Custom404
