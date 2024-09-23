import { FC, useEffect, useRef } from 'react'

import useStore from '../hooks/useStore'


export type BoxberryProps = {

}


const Boxberry: FC<BoxberryProps> = ({

}) => {
  const { setBoxberryData } = useStore()
  const { boxberry } = window
  const boxberryResult = (result: BoxberryResultType) => {
    setBoxberryData(result)
  }

  const boxberry_map_ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (boxberry_map_ref.current && boxberry_map_ref.current.children.length === 0) {
      boxberry.openOnPage('boxberry_map')
      boxberry.open(boxberryResult)
    }
  }, [])

  return (
    <div className='Boxberry'>
      <div
        id='boxberry_map'
        ref={boxberry_map_ref}
      />
    </div>
  )
}


export default Boxberry


export type BoxberryResultType = {
  name: string
  price: string
  id: string
  address: string
  workschedule: string
  phone: string
  period: string
  prepaid: string
}