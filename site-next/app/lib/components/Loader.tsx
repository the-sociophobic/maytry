'use client'

import useStore from '../hooks/useStore'


const Loader = () => {
  const { isLoading } = useStore()  

  return !isLoading ? <></> : (
    <div className='Loader'>
      Загрузка...
    </div>
  )
}


export default Loader
