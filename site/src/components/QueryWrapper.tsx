import React from 'react'

import {
  QueryClient,
  QueryClientProvider,
  Hydrate
} from 'react-query'


export type QueryWrapperProps = {
  children: React.ReactNode
}


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

const QueryWrapper: React.FC<QueryWrapperProps> = ({
  children
}) =>
  <QueryClientProvider client={queryClient}>
    <Hydrate state={{}}>
      {children}
    </Hydrate>
  </QueryClientProvider>


export default QueryWrapper
