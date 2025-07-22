'use client'
 
import { FC, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

import useUser from '../lib/hooks/user/useUser'
import useStore from '../lib/hooks/useStore'
import useUserOrders from '../lib/hooks/user/useUserOrders'
import UserOrder from '../lib/components/UserOrder'
import printTimestamp from '../lib/utils/printTimestamp'
import useContentful from '../lib/hooks/useContentful'
import Button from '../lib/components/Button'
import { post } from '../lib/utils/requests'
import { useNotification } from '../lib/components/NotificationProvider';
import MapModal from '../lib/components/MapModal'
import { useQueryClient } from '@tanstack/react-query';


const Account: FC = () => {
  const { data: user } = useUser()
  const router = useRouter()
  const { logged } = useStore()
  const { data } = useUserOrders()
  const orders = data?.orders || []
  const { data: contentful } = useContentful()
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  // Editable personal data state
  const [fullName, setFullName] = useState(user?.fullName || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [birthdate, setBirthdate] = useState(user?.birthdate || '')
  const [deliveryType, setDeliveryType] = useState(user?.deliveryType || '')
  const [deliveryAddress, setDeliveryAddress] = useState(user?.deliveryAddress || '')
  const [editMode, setEditMode] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)

  // Change password modal state
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changePasswordError, setChangePasswordError] = useState('')
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('')
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const personalDataRef = useRef<HTMLDivElement | null>(null)
  const saveButtonMouseDown = useRef(false)

  // Bonuses
  const bonuses = user?.bonuses || []

  // Map modal state
  const [showMapModal, setShowMapModal] = useState(false)
  const [mapAddress, setMapAddress] = useState('')
  const [mapCoords, setMapCoords] = useState<[number, number] | null>(null)

  // Save personal data
  const handleSave = async () => {
    setSaveError('')
    setSaveSuccess('')
    setSaveLoading(true)
    try {
      if (!user || !user.token) {
        setSaveError('Ошибка авторизации')
        setSaveLoading(false)
        return
      }
      const res = await post<{ success: boolean }>('/update-user', {
        token: user.token,
        fullName,
        phone,
        birthdate,
        deliveryType,
        deliveryAddress
      })
      if (res && res.success) {
        setSaveSuccess('Данные успешно сохранены')
        setEditMode(false)
        showNotification('Настройки успешно сохранены')
      } else {
        setSaveError('Ошибка сохранения данных')
      }
    } catch (e: any) {
      setSaveError(e?.response?.data?.error || 'Ошибка сохранения данных')
    } finally {
      setSaveLoading(false)
    }
  }

  // Change password
  const handleChangePassword = async () => {
    setChangePasswordError('')
    setChangePasswordSuccess('')
    if (!oldPassword || !newPassword || !confirmPassword) {
      setChangePasswordError('Заполните все поля')
      return
    }
    if (newPassword !== confirmPassword) {
      setChangePasswordError('Пароли не совпадают')
      return
    }
    setChangePasswordLoading(true)
    try {
      if (!user || !user.token) {
        setChangePasswordError('Ошибка авторизации')
        return
      }
      const res = await post<{ success: boolean }>('/change-password', {
        token: user.token,
        oldPassword,
        newPassword
      })
      if (res && res.success) {
        setChangePasswordSuccess('Пароль успешно изменён')
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setTimeout(() => setShowChangePassword(false), 1500)
      } else {
        setChangePasswordError('Ошибка смены пароля')
      }
    } catch (e: any) {
      setChangePasswordError(e?.response?.data?.error || 'Ошибка смены пароля')
    } finally {
      setChangePasswordLoading(false)
    }
  }

  const handleMapSelect = (address: string, coords: [number, number]) => {
    setDeliveryAddress(address)
    setMapAddress(address)
    setMapCoords(coords)
    setShowMapModal(false)
  }

  useEffect(() => {
    if (!logged)
      router.push('/')
  }, [logged, router])

  useEffect(() => {
    setFullName(user?.fullName || '')
    setPhone(user?.phone || '')
    setBirthdate(user?.birthdate || '')
    setDeliveryType(user?.deliveryType || '')
    setDeliveryAddress(user?.deliveryAddress || '')
  }, [user])

  if (!user || !orders || !contentful) {
    return <div>Не авторизован</div>
  }

  return (
    <div className="container">
      <div className="row justify-content-between flex-column flex-md-row gap-3 gap-md-4">
        {/* Left column: Orders and Bonuses */}
        <div className="col-12 col-md mb-4 mb-md-0 p-0 p-md-2">
          <h3 className="h3 mb-4 mb-md-5">Личный кабинет {user.email}</h3>
          <h3 className="h3 mb-4 mb-md-5">Заказы</h3>
          {orders.length === 0 ? (
            <div className="mb-4">Пока что нет заказов</div>
          ) : (
            orders
              .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
              .map(order => {
                const orderItemsWithImages = order.items.map(item => {
                  const itemInContentful = contentful.items
                    .find(itemInContentful => itemInContentful.link === item.link)
                  return ({
                    ...item,
                    images: itemInContentful?.images || item.images
                  })
                })
                return (
                  <div key={order.order_id} className="mb-4 pb-3 border-bottom">
                    <h3 className='h3 mb-2 mt-4 mt-md-5'>
                      Заказ #{order.order_id} {order.timestamp ? ` (${printTimestamp(order.timestamp)})` : ''}
                    </h3>
                    <UserOrder items={orderItemsWithImages} totalPrice={order.price} />
                  </div>
                )
              })
          )}
          <hr className="my-4 d-none d-md-block" />
          <h3 className='h3 mb-4 mb-md-5'>Бонусы</h3>
          {bonuses.length > 0 ? (
            <div>
              <div className="mb-2">Доступно: {bonuses.filter(b => (!b.expiresAt || b.expiresAt > Date.now())).reduce((sum, b) => sum + (b.amount - (b.usedAmount || 0)), 0)} Ctrl Coins</div>
              <div className="table-responsive">
                <table className="table table-sm" style={{ minWidth: 400, width: '100%', marginTop: 8, marginBottom: 24 }}>
                  <thead>
                    <tr>
                      <th>Сумма</th>
                      <th>Тип</th>
                      <th>Причина</th>
                      <th>Дата начисления</th>
                      <th>Дата сгорания</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bonuses.map(bonus => (
                      <tr key={bonus.id}>
                        <td>{bonus.amount}</td>
                        <td>{bonus.type === 'perpetual' ? 'Бессрочный' : 'Срочный'}</td>
                        <td>{bonus.reason}</td>
                        <td>{bonus.issuedAt ? new Date(bonus.issuedAt).toLocaleDateString() : ''}</td>
                        <td>{bonus.expiresAt ? new Date(bonus.expiresAt).toLocaleDateString() : '-'}</td>
                        <td>{(bonus.usedAmount || 0) >= bonus.amount ? 'Использован/Сгорел' : 'Доступен'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mb-3">
                <a href="/loyalty" className="text-primary link-underline-black" style={{ cursor: 'pointer' }}>
                  Условия получения бонусов
                </a>
              </div>
              <Button
                black
                className="mb-3"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['user'] })}
              >
                Обновить данные
              </Button>
            </div>
          ) : (
            <div>У вас пока нет бонусов.</div>
          )}
        </div>
        {/* Right column: Personal Data */}
        <div className="col-12 col-md p-0 p-md-2" ref={personalDataRef}>
          <h3 className="h3 mb-3 mb-md-4">Персональные данные</h3>
          <div className='mb-3'>
            <label>ФИО:</label>
            <input
              type='text'
              className='form-control'
              value={fullName}
              disabled={!editMode}
              onChange={e => setFullName(e.target.value)}
              style={{ opacity: editMode ? 1 : 0.6, background: editMode ? undefined : '#f8f9fa' }}
              placeholder="Иван Иванов"
            />
          </div>
          <div className='mb-3'>
            <label>Телефон:</label>
            <input
              type='text'
              className='form-control'
              value={phone}
              disabled={!editMode}
              onChange={e => setPhone(e.target.value)}
              placeholder="Телефон"
              style={{ opacity: editMode ? 1 : 0.6, background: editMode ? undefined : '#f8f9fa' }}
            />
          </div>
          <div className='mb-3'>
            <label>Дата рождения:</label>
            <input
              type='date'
              className='form-control'
              value={birthdate}
              disabled={!editMode}
              onChange={e => setBirthdate(e.target.value)}
              style={{ opacity: editMode ? 1 : 0.6, background: editMode ? undefined : '#f8f9fa' }}
              placeholder="1990-01-01"
            />
          </div>
          <div className='mb-3'>
            <label>Способ доставки:</label>
            {editMode ? (
              <select
                className='form-control'
                value={deliveryType}
                onChange={e => setDeliveryType(e.target.value)}
                style={{ opacity: 1, background: undefined }}
              >
                <option value=''>Выберите способ доставки</option>
                <option value='Курьер'>Курьер</option>
                <option value='Самовывоз'>Самовывоз</option>
                <option value='Пункт выдачи'>Пункт выдачи</option>
              </select>
            ) : (
              <input
                type='text'
                className='form-control'
                value={deliveryType}
                disabled
                style={{ opacity: 0.6, background: '#f8f9fa' }}
                placeholder="Курьер/Самовывоз/Пункт выдачи"
              />
            )}
          </div>
          <div className='mb-3'>
            <label>Адрес доставки:</label>
            <input
              type='text'
              className='form-control'
              value={deliveryAddress}
              disabled={!editMode}
              onChange={e => setDeliveryAddress(e.target.value)}
              onClick={editMode ? () => setShowMapModal(true) : undefined}
              style={{ opacity: editMode ? 1 : 0.6, background: editMode ? undefined : '#f8f9fa', cursor: editMode ? 'pointer' : undefined }}
              placeholder="г. Москва, ул. Пушкина, д. 1"
              readOnly={editMode} // prevent manual typing in edit mode, only allow via map
            />
          </div>
          {showMapModal && (
            <MapModal
              onClose={() => setShowMapModal(false)}
              onSelect={handleMapSelect}
            />
          )}
          <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center mt-3 gap-2 gap-md-0">
            {editMode ? (
              <Button
                black
                onClick={handleSave}
                className="mb-2 mb-md-0 me-md-2"
                disabled={saveLoading}
              >
                Сохранить
              </Button>
            ) : (
              <Button black onClick={() => setEditMode(true)} className="mb-2 mb-md-0 me-md-2">Редактировать</Button>
            )}
            <Button className="ms-0 ms-md-2" onClick={() => setShowChangePassword(true)} disabled={!user || !user.token}>
              Сменить пароль
            </Button>
          </div>
          {saveSuccess && <div className="text-success mt-2">{saveSuccess}</div>}
          {saveError && <div className="text-danger mt-2">{saveError}</div>}

          {/* Change Password Modal */}
          {showChangePassword && (
            <div style={{
              position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ background: '#fff', padding: 16, borderRadius: 12, maxWidth: 600, width: '100%' }} className="mx-2 mx-md-0">
                <h4 className='mb-3'>Смена пароля</h4>
                <div className='mb-2 position-relative'>
                  <input
                    type={showOld ? 'text' : 'password'}
                    className='form-control pr-5'
                    placeholder='Старый пароль'
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    disabled={changePasswordLoading}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-0 mt-2 me-2 p-0"
                    tabIndex={-1}
                    style={{ outline: 'none', boxShadow: 'none' }}
                    onClick={() => setShowOld(v => !v)}
                  >
                    {showOld ? (
                      <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><circle cx="10" cy="10" r="1.5" fill="#222"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><line x1="4" y1="16" x2="16" y2="4" stroke="#222" strokeWidth="1.2"/></svg>
                    )}
                  </button>
                </div>
                <div className='mb-2 position-relative'>
                  <input
                    type={showNew ? 'text' : 'password'}
                    className='form-control pr-5'
                    placeholder='Новый пароль'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    disabled={changePasswordLoading}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-0 mt-2 me-2 p-0"
                    tabIndex={-1}
                    style={{ outline: 'none', boxShadow: 'none' }}
                    onClick={() => setShowNew(v => !v)}
                  >
                    {showNew ? (
                      <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><circle cx="10" cy="10" r="1.5" fill="#222"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><line x1="4" y1="16" x2="16" y2="4" stroke="#222" strokeWidth="1.2"/></svg>
                    )}
                  </button>
                </div>
                <div className='mb-2 position-relative'>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    className='form-control pr-5'
                    placeholder='Повторите новый пароль'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    disabled={changePasswordLoading}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-0 mt-2 me-2 p-0"
                    tabIndex={-1}
                    style={{ outline: 'none', boxShadow: 'none' }}
                    onClick={() => setShowConfirm(v => !v)}
                  >
                    {showConfirm ? (
                      <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><circle cx="10" cy="10" r="1.5" fill="#222"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="7" ry="4" stroke="#222" strokeWidth="1.5" fill="none"/><line x1="4" y1="16" x2="16" y2="4" stroke="#222" strokeWidth="1.2"/></svg>
                    )}
                  </button>
                </div>
                {changePasswordError && <div className='text-danger mb-2'>{changePasswordError}</div>}
                {changePasswordSuccess && <div className='text-success mb-2'>{changePasswordSuccess}</div>}
                <div style={{ marginTop: 24 }} className='d-flex flex-column flex-md-row justify-content-between gap-2'>
                  <Button black onClick={handleChangePassword} disabled={changePasswordLoading}>Сохранить</Button>
                  <Button onClick={() => setShowChangePassword(false)} disabled={changePasswordLoading}>Отмена</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account
