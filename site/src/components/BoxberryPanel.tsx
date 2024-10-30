import { FC, useEffect, useRef } from 'react'

import useStore from '../hooks/useStore'
import getUserLocation from '../utils/getIP'
import useTotalPrice from '../hooks/useTotalPrice'
import { BoxberryDataType } from '../types/boxberry.type'


export type BoxberryPanelProps = {}


const BoxberryPanel: FC<BoxberryPanelProps> = ({

}) => {
  const { userCity } = useStore()
  const { setUserCity } = useStore()
  const updateUserCity = async () => {
    setUserCity((await getUserLocation()).city)
  }

  useEffect(
    () => {
      if (userCity.length === 0)
        updateUserCity()
    },
    [userCity]
  )

  const { setBoxberryData } = useStore()
  const { setUserZIP } = useStore()
  const { setUserAddress } = useStore()
  const { boxberry } = window
  const boxberryCallbackFn = (result: BoxberryDataType) => {
    setBoxberryData(result)
    setUserZIP(result.zip)
    setUserCity(result.name)
    setUserAddress(result.address.replace(`${result.zip}, ${result.name} г, `, ''))
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
    <div className='Boxberry'>
      <div
        id='boxberry_map'
        ref={boxberry_map_ref}
      />
    </div>
  )
}


export default BoxberryPanel
