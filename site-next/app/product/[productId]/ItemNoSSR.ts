'use client'

import dynamic from 'next/dynamic'

const ItemNoSSR = dynamic(
  () => import('./Item'),
  { ssr: false }
)


export default ItemNoSSR
