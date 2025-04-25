'use client'

// import useStore from '../hooks/useStore'


const Loader = () => {
  // const { isLoading } = useStore()  

  // return !isLoading ? <></> : (
  return (
    <div className='Loader'>
      <p>Загрузка...</p>
      <div className='Loader__bar-container'>
        <div className='Loader__bar' />
      </div>
    </div>
  )
}


export default Loader
