import { FC, useState } from 'react'

import Button from '../components/Button'
import Orders from '../components/Orders'
import { get } from '../utils/requests'
import useStore from '../hooks/useStore'
import Input from '../components/Input'


const Admin: FC = () => {
  const { adminPassword } = useStore()

  return adminPassword === 'parol' ?
    <Authotized />
    :
    <Unauthotized />
}


export default Admin


const Authotized: FC = () => {
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

const Unauthotized: FC = () => {
  const { adminPassword } = useStore()
  const { setAdminPassword } = useStore()

  return (
    <div className='container-2'>
      <div className='row'>
        <Input
          label='Админский пароль'
          value={adminPassword}
          onChange={setAdminPassword}
        />
      </div>
    </div>
  )
}