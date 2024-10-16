import { FC, useEffect, useRef } from 'react'

import useStore from '../hooks/useStore'
import getUserLocation from '../utils/getIP'
import useTotalPrice from '../hooks/useTotalPrice'


export type BoxberryProps = {

}


const Boxberry: FC<BoxberryProps> = ({

}) => {
  const { userCity } = useStore()
  const { setUserCity } = useStore()
  const updateUserCity = async () => {
    setUserCity((await getUserLocation()).city)
  }

  useEffect(() => { updateUserCity() }, [])

  const { boxberryData } = useStore()
  const { setBoxberryData } = useStore()
  const { boxberry } = window
  const boxberryCallbackFn = (result: BoxberryResultType) => {
    setBoxberryData(result)
    console.log(result)
  }

  const boxberry_map_ref = useRef<HTMLDivElement>(null)
  const totalPrice = useTotalPrice()

  useEffect(() => {
    if (
      boxberry_map_ref.current &&
      boxberry_map_ref.current.children.length === 0 &&
      userCity
    ) {
      boxberry.openOnPage('boxberry_map')
      boxberry.open(
        boxberryCallbackFn,
        import.meta.env.VITE_BOXBERRY_KEY_TOKEN,
        userCity,
        '01010',
        totalPrice,
        500,
        0,
        30,
        70,
        70
      )
      // boxberry.open(
      //   boxberryCallbackFn,
      //   // '1$WpWbZp2orUSKIPQJilLLy3dfCAx6_dZj',
      //   import.meta.env.VITE_BOXBERRY_KEY_TOKEN,
      //   // '1$9ad707c2628d25fcd212a01daed532f3',
      //   // 'a6a1e181d0e09531e0059bf3621f581f',
      //   'Екатеринбург','010', 574, 5, 0, 200, 200, 200
      // )
    }
  }, [userCity])

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