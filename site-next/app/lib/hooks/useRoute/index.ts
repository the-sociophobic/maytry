'use client'

import { usePathname } from 'next/navigation'

import routes from './routes'


const useRoute = () => {
  const pathname = usePathname()

  return routes
    .find(route => route.to.replace('*', '') === pathname)
}


export default useRoute
