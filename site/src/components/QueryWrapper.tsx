import React, { useState } from 'react'

import {
  QueryClient,
  QueryClientProvider,
  Hydrate
} from 'react-query'


export type QueryWrapperProps = {
  children: React.ReactNode
}


const QueryWrapper: React.FC<QueryWrapperProps> = ({
  children
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // refetchOnWindowFocus: false,
            // retry: 0,
            staleTime: 60 * 1000
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate
        // state={{}}
      >
        {children}
      </Hydrate>
    </QueryClientProvider>
  )
}


export default QueryWrapper
