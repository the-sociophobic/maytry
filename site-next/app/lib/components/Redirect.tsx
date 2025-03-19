'use client'
 
import { FC, useEffect } from 'react'

import { useRouter } from 'next/navigation'


export type RedirectProps = {
  to: string
}


const Redirect: FC<RedirectProps> = ({
  to
}) => {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [])

  return <div>Redirect page</div>
}


export default Redirect
