import Head from 'next/head'

import { FC } from 'react'


export type CanonicalProps = {
  href: string
}


const Canonical: FC<CanonicalProps> = ({
  href
}) => {
  return (
    <Head>
      <link
        rel='canonical'
        href={`https://maytry.ru${href}`}
        key='canonical'
      />
    </Head>
  )
}


export default Canonical
