'use client'

import { FC, useEffect, useState } from 'react'

import Button from '../lib/components/Button'
import Orders from '../lib/components/Orders'
import { get, post } from '../lib/utils/requests'
import useStore from '../lib/hooks/useStore'
import Input from '../lib/components/Input'
import downloadFile from '../lib/utils/preloaded/downloadFile'
import { getContentfulDataWithoutBadItems } from '../lib/hooks/useContentful'
import { UserType, BonusEntry } from '../lib/types/user.type'
import { v4 as uuidv4 } from 'uuid'


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

  // User management state
  const [users, setUsers] = useState<UserType[]>([])
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [saveStatus, setSaveStatus] = useState<string>('')
  const [userSearch, setUserSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const usersList = await get<UserType[]>('/users')
        setUsers(usersList)
      } catch (e) {
        setUsers([])
      }
      setIsLoading(false)
    }
    fetchUsers()
  }, [setIsLoading])

  // Update selected user when email changes
  useEffect(() => {
    if (!selectedUserEmail) {
      setSelectedUser(null)
      return
    }
    const user = users.find(u => u.email === selectedUserEmail)
    setSelectedUser(user || null)
  }, [selectedUserEmail, users])

  // Handle bonus field change
  const handleBonusChange = (bonusIndex: number, field: keyof BonusEntry, value: any) => {
    if (!selectedUser) return
    const updatedBonuses = (selectedUser.bonuses || []).map((bonus, idx) =>
      idx === bonusIndex ? { ...bonus, [field]: value } : bonus
    )
    setSelectedUser({ ...selectedUser, bonuses: updatedBonuses })
  }

  // Save user bonuses
  const handleSaveBonuses = async () => {
    if (!selectedUser) return
    setSaveStatus('')
    setIsLoading(true)
    try {
      await post('/update-user', {
        token: selectedUser.token,
        bonuses: selectedUser.bonuses
      })
      setSaveStatus('Сохранено!')
    } catch (e) {
      setSaveStatus('Ошибка сохранения')
    }
    setIsLoading(false)
  }

  // Add bonus
  const handleAddBonus = () => {
    if (!selectedUser) return
    const newBonus: BonusEntry = {
      id: uuidv4(),
      amount: 0,
      type: 'perpetual',
      reason: '',
      issuedAt: Date.now(),
      expiresAt: undefined,
      usedAmount: 0
    }
    setSelectedUser({
      ...selectedUser,
      bonuses: [...(selectedUser.bonuses || []), newBonus]
    })
  }

  // Delete bonus
  const handleDeleteBonus = (bonusIndex: number) => {
    if (!selectedUser) return
    const updatedBonuses = (selectedUser.bonuses || []).filter((_, idx) => idx !== bonusIndex)
    setSelectedUser({ ...selectedUser, bonuses: updatedBonuses })
  }

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

  // Filter users by search
  const filteredUsers = userSearch
    ? users.filter(user => user.email && user.email.toLowerCase().includes(userSearch.toLowerCase()))
    : users.slice(0, 10)

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

      <h4 className='h4 my-4 font-bold'>Пользователи</h4>
      <div className='row mb-4'>
        <div className='col-md-6' style={{ position: 'relative' }}>
          <label>Найти пользователя по email:</label>
          <input
            className='form-control'
            type='text'
            value={userSearch}
            onChange={e => {
              setUserSearch(e.target.value)
              setShowDropdown(true)
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder='Введите email...'
          />
          {showDropdown && (
            <div style={{
              position: 'absolute',
              zIndex: 10,
              background: '#fff',
              border: '1px solid #ccc',
              width: '100%',
              maxHeight: 200,
              overflowY: 'auto',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              {filteredUsers.length === 0 ? (
                <div style={{ padding: 8, color: '#888' }}>Пользователь не найден</div>
              ) : (
                filteredUsers.map(user => (
                  <div
                    key={user.email}
                    style={{ padding: 8, cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedUserEmail(user.email)
                      setUserSearch(user.email)
                      setShowDropdown(false)
                    }}
                  >
                    {user.email}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {selectedUser && (
        <div className='row mb-4'>
          <div className='col-md-10'>
            <h5>Бонусы пользователя: {selectedUser.email}</h5>
            <Button black className='mb-2' onClick={handleAddBonus}>
              Добавить бонус
            </Button>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>Сумма</th>
                  <th>Тип</th>
                  <th>Причина</th>
                  <th>Дата начисления</th>
                  <th>Дата сгорания</th>
                  <th>Статус</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(selectedUser.bonuses || []).map((bonus, idx) => (
                  <tr key={bonus.id}>
                    <td>
                      <input
                        type='number'
                        className='form-control'
                        value={bonus.amount}
                        onChange={e => handleBonusChange(idx, 'amount', Number(e.target.value))}
                      />
                    </td>
                    <td>
                      <select
                        className='form-control'
                        value={bonus.type}
                        onChange={e => handleBonusChange(idx, 'type', e.target.value)}
                      >
                        <option value='perpetual'>Бессрочный</option>
                        <option value='expiring'>Срочный</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type='text'
                        className='form-control'
                        value={bonus.reason}
                        onChange={e => handleBonusChange(idx, 'reason', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type='date'
                        className='form-control'
                        value={bonus.issuedAt ? new Date(bonus.issuedAt).toISOString().slice(0, 10) : ''}
                        onChange={e => handleBonusChange(idx, 'issuedAt', e.target.value ? new Date(e.target.value).getTime() : undefined)}
                      />
                    </td>
                    <td>
                      <input
                        type='date'
                        className='form-control'
                        value={bonus.expiresAt ? new Date(bonus.expiresAt).toISOString().slice(0, 10) : ''}
                        onChange={e => handleBonusChange(idx, 'expiresAt', e.target.value ? new Date(e.target.value).getTime() : undefined)}
                      />
                    </td>
                    <td>
                      {(bonus.usedAmount || 0) >= bonus.amount ? 'Использован/Сгорел' : 'Доступен'}
                    </td>
                    <td>
                      <Button className='btn btn-danger btn-sm' onClick={() => handleDeleteBonus(idx)}>
                        Удалить
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button black className='mt-2' onClick={handleSaveBonuses} disabled={isLoading}>
              Сохранить бонусы
            </Button>
            {saveStatus && <div className='mt-2'>{saveStatus}</div>}
          </div>
        </div>
      )}

      <h4 className='h4 my-4 font-bold'>Заказы</h4>
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
