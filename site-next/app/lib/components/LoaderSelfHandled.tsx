'use client'

import useStore from '../hooks/useStore'
import Loader from './Loader'


const LoaderSelfHandled = () => {
  const { isLoading } = useStore()

  return !isLoading ? <></> : <Loader />
}


export default LoaderSelfHandled
