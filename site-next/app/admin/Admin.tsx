'use client'

import { FC } from 'react'

import Button from '../lib/components/Button'
import Orders from '../lib/components/Orders'
import { get } from '../lib/utils/requests'
import useStore from '../lib/hooks/useStore'
import Input from '../lib/components/Input'
import downloadFile from '../lib/utils/preloaded/downloadFile'
import { getContentfulDataWithoutBadItems } from '../lib/hooks/useContentful'


const Admin: FC = () => {
  const { adminPassword } = useStore()

  return adminPassword === 'parol' ?
    <Authotized />
    :
    <Unauthotized />
}


export default Admin


const Authotized: FC = () => {
  const { isLoading } = useStore()
  const { setIsLoading } = useStore()

  const updateData = async () => {
    setIsLoading(true)
    await get('/update-data')
    setIsLoading(false)
  }
  const updateCombinedData = async () => {
    setIsLoading(true)
    await get('/update-combined-data')
    setIsLoading(false)
  }
  const downloadCombinedJSON = async () => {
    setIsLoading(true)
    const data = await getContentfulDataWithoutBadItems()
    downloadFile(JSON.stringify(data), 'combined', 'json')
    setIsLoading(false)
  }

  return (
    <div className='container-2'>
      <div className='row'>
        <div className='col'>
          <Button
            black
            className='d-inline-block me-3'
            onClick={updateData}
          >
            {isLoading ? 'обновление...' : 'Обновить данные с 1С и contentful'}
          </Button>
          <Button
            black
            className='d-inline-block me-3'
            onClick={updateCombinedData}
          >
            {isLoading ? 'обновление...' : 'Обновить формат данных'}
          </Button>
          <Button
            black
            className='d-inline-block'
            onClick={downloadCombinedJSON}
          >
            Скачать combined.json
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
