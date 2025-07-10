'use client'

import { FC } from "react"

// import useStore from '../hooks/useStore'


export type LoaderProps = {
  className?: string
}


const Loader: FC<LoaderProps> = ({
  className
}) => {
  // const { isLoading } = useStore()  

  // return !isLoading ? <></> : (
  return (
    <div className={`Loader ${className}`}>
      <p>Загрузка...</p>
      <div className='Loader__bar-container'>
        <div className='Loader__bar' />
      </div>
    </div>
  )
}


export default Loader
