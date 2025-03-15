import { useNavigation } from 'react-router'

import useStore from '../hooks/useStore'


const Loader = () => {
  const { isLoading } = useStore()
  const navigation = useNavigation()
  const isNavigating = Boolean(navigation.location)

  return !(isLoading || isNavigating) ?
    <></>
    :
    <div className='Loader'>
      Загрузка...
    </div>
}


export default Loader
