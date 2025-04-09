import Head from 'next/head'

import { FC } from 'react'


export type NoindexProps = {
}


const Noindex: FC<NoindexProps> = ({ }) => {
  return (
    <Head>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
  )
}


export default Noindex
