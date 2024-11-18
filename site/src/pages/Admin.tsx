import { FC, useState } from 'react'

import Button from '../components/Button'
import Orders from '../components/Orders'
import { get } from '../utils/requests'


const Admin: FC = ({

}) => {
  const [dataState, setDataState] = useState('loaded')
  const updateData = async () => {
    setDataState('loading')
    const data = await get('/update-data')
    setDataState('loaded')
    return data
  }
  const updateCombinedData = async () => {
    setDataState('loading')
    const data = await get('/update-combined-data')
    setDataState('loaded')
    return data
  }

  return (
    <div className='container-2'>
      <div className='row'>
        <div className='col'>
          <Button
            black
            className='d-inline-block me-3'
            onClick={updateData}
            disabled={dataState === 'loading'}
          >
            {dataState === 'loading' ? 'обновление...' : 'Обновить данные с 1С и contentful'}
          </Button>
          <Button
            black
            className='d-inline-block'
            onClick={updateCombinedData}
            disabled={dataState === 'loading'}
          >
            {dataState === 'loading' ? 'обновление...' : 'Обновить формат данных'}
          </Button>
        </div>
      </div>

      <h4 className='h4 my-4 font-bold'>
        Заказы
      </h4>
      <Orders />
    </div>
  )
}


export default Admin
