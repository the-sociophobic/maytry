import { FC, useState } from 'react'
import axios from 'axios'

import Button from '../components/Button'
import isProd from '../utils/isProd'


const updateDataURL = isProd() ?
  'https://hyperdao.xyz/maytry/update-data'
  :
  'http://localhost:5010/update-data'


  const Admin: FC = ({

}) => {
  const [dataState, setDataState] = useState('loaded')
  const updateData = async () => {
    setDataState('loading')
    const { data } = await axios.get(updateDataURL)
    setDataState('loaded')
    return data
  }

  return (
    <div className='Admin'>
      <Button
        black
        onClick={updateData}
        disabled={dataState === 'loading'}
      >
        {dataState === 'loading' ? 'обновление...' : 'Обновить данные с 1С и contentful'}
      </Button>
    </div>
  )
}


export default Admin
