import type { AppProps } from 'next/app'

import { useState } from 'react'

// https://tanstack.com/query/latest/docs/framework/react/guides/ssr
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


function MyApp({
  Component,
  pageProps
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}


export default MyApp
