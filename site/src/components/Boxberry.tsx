import { FC, useEffect, useRef } from 'react'

import useStore from '../hooks/useStore'


export type BoxberryProps = {

}


const Boxberry: FC<BoxberryProps> = ({

}) => {
  const { boxberryData } = useStore()
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
    <div className='Boxberry d-flex flex-column'>
      <div
        id='boxberry_map'
        ref={boxberry_map_ref}
      />

      {boxberryData &&
        <div className='d-flex flex-row justify-content-between py-3'>
          Товары будут доставлены по адресу: {boxberryData.address}
        </div>
      }
    </div>
  )
}


export default Boxberry


export type BoxberryResultType = {
  id: string
  zip: string
  name: string
  address: string
  phone: string
  workschedule: string
  period: string
  price: string
  prepaid: string
  loadlimit: string
}