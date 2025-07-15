import { FC, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from '../hooks/user/useUser'
import useStore from '../hooks/useStore'
import useUserOrders from '../hooks/user/useUserOrders'
import UserOrder from '../components/UserOrder'
import printTimestamp from '../utils/printTimestamp'
import useContentful from '../hooks/useContentful'
import Button from '../components/Button'
import { post } from '../utils/requests'
import { useState as useToggleState } from 'react'
import { useQueryClient } from 'react-query'

const Account: FC = () => {
  const { data: user } = useUser()
  const navigate = useNavigate()
  const { logged } = useStore()
  const { data } = useUserOrders()
  const orders = data?.orders
  const { data: contentful } = useContentful()
  const queryClient = useQueryClient()

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

  // Смена пароля
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [changePasswordError, setChangePasswordError] = useState('')
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('')
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)
  // visibility toggles
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const birthdateInputRef = useRef<HTMLInputElement | null>(null)
  const personalDataRef = useRef<HTMLDivElement | null>(null)
  // Prevent click outside from firing when clicking Save
  const saveButtonMouseDown = useRef(false)
  useEffect(() => {
    if (!editMode) return
    function handleClickOutside(event: MouseEvent) {
      if (saveButtonMouseDown.current) {
        saveButtonMouseDown.current = false
        return
      }
      if (personalDataRef.current && !personalDataRef.current.contains(event.target as Node)) {
        setEditMode(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editMode])

  // Phone code select and mask
  const PHONE_CODES = [
    { code: '+7', label: '🇷🇺 +7' },
    { code: '+375', label: '🇧🇾 +375' },
    { code: '+380', label: '🇺🇦 +380' },
    { code: '+996', label: '🇰🇬 +996' },
    { code: '+998', label: '🇺🇿 +998' },
    { code: '+374', label: '🇦🇲 +374' },
    { code: '+993', label: '🇹🇲 +993' },
    { code: '+994', label: '🇦🇿 +994' },
    { code: '+995', label: '🇬🇪 +995' },
    { code: '+372', label: '🇪🇪 +372' },
    { code: '+371', label: '🇱🇻 +371' },
    { code: '+370', label: '🇱🇹 +370' },
    { code: '+373', label: '🇲🇩 +373' },
    { code: '+48', label: '🇵🇱 +48' },
    { code: '+420', label: '🇨🇿 +420' },
    { code: '+49', label: '🇩🇪 +49' },
    { code: '+1', label: '🇺🇸 +1' },
  ]
  // Split phone into code and number for editing
  const getInitialPhoneCode = (phone?: string) => {
    if (!phone) return '+7'
    const found = PHONE_CODES.find(c => phone.startsWith(c.code))
    return found ? found.code : '+7'
  }
  const getInitialPhoneNumber = (phone?: string) => {
    if (!phone) return ''
    const found = PHONE_CODES.find(c => phone.startsWith(c.code))
    return found ? phone.replace(found.code, '').trim() : phone
  }
  const [phoneCode, setPhoneCode] = useState(getInitialPhoneCode(user?.phone))
  const [phoneNumber, setPhoneNumber] = useState(getInitialPhoneNumber(user?.phone))
  useEffect(() => {
    setPhoneCode(getInitialPhoneCode(user?.phone))
    setPhoneNumber(getInitialPhoneNumber(user?.phone))
  }, [user])
  // Phone mask patterns by code
  const PHONE_MASKS: Record<string, { mask: string; placeholder: string }> = {
    '+7':    { mask: '999 999-99-99', placeholder: '999 999-99-99' },
    '+375':  { mask: '99 999-99-99', placeholder: '29 123-45-67' },
    '+380':  { mask: '99 999-99-99', placeholder: '67 123-45-67' },
    '+996':  { mask: '999 999-999', placeholder: '700 123-456' },
    '+998':  { mask: '99 999-99-99', placeholder: '90 123-45-67' },
    '+374':  { mask: '99 999-999', placeholder: '91 234-567' },
    '+993':  { mask: '6 99-99-99', placeholder: '6 12-34-56' },
    '+994':  { mask: '99 999-99-99', placeholder: '50 123-45-67' },
    '+995':  { mask: '599 999-999', placeholder: '599 123-456' },
    '+372':  { mask: '9999 9999', placeholder: '5123 4567' },
    '+371':  { mask: '99 999-999', placeholder: '21 234-567' },
    '+370':  { mask: '999 99 999', placeholder: '612 34 567' },
    '+373':  { mask: '6999 9999', placeholder: '6912 3456' },
    '+48':   { mask: '999-999-999', placeholder: '123-456-789' },
    '+420':  { mask: '999 999 999', placeholder: '123 456 789' },
    '+49':   { mask: '9999 9999999', placeholder: '1512 3456789' },
    '+1':    { mask: '(999) 999-9999', placeholder: '(555) 123-4567' },
  }

  // Dynamic mask function
  function maskByPattern(value: string, pattern: string) {
    let v = value.replace(/\D/g, '')
    if (!v) return ''
    let res = ''
    let vi = 0
    for (let pi = 0; pi < pattern.length && vi < v.length; pi++) {
      if (pattern[pi] === '9') {
        res += v[vi++]
      } else {
        // Only insert literal if at least one digit has been typed
        if (vi > 0 || pi === 0 && pattern[pi] !== '9' && v[0] === pattern[pi]) {
          res += pattern[pi]
        }
      }
    }
    return res
  }

  const maskPhone = (value: string) => {
    if (!value) return ''
    const pattern = PHONE_MASKS[phoneCode]?.mask || '999 999-99-99'
    return maskByPattern(value, pattern)
  }
  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (!raw) {
      setPhoneNumber('')
      return
    }
    setPhoneNumber(maskPhone(raw))
  }

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

  useEffect(() => {
    if (!logged)
      navigate('/')
  }, [logged, navigate])

  useEffect(() => {
    setFullName(user?.fullName || '')
    setPhone(user?.phone || '')
    setBirthdate(user?.birthdate || '')
    setDeliveryType(user?.deliveryType || '')
    setDeliveryAddress(user?.deliveryAddress || '')
  }, [user])

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
        phone: phoneCode + ' ' + phoneNumber.trim(),
        birthdate,
        deliveryType,
        deliveryAddress
      })
      if (res && res.success) {
        setSaveSuccess('Данные успешно сохранены')
        setEditMode(false)
        await queryClient.invalidateQueries({ queryKey: ['user'] })
      } else {
        setSaveError('Ошибка сохранения данных')
      }
    } catch (e: any) {
      setSaveError(e?.response?.data?.error || 'Ошибка сохранения данных')
    } finally {
      setSaveLoading(false)
    }
  }

  if (!user || !orders || !contentful) {
    return <div>Не авторизован</div>
  }

  const getPhonePlaceholder = () => PHONE_MASKS[phoneCode]?.placeholder || '999 999-99-99'

  return (
    <div className="container">
      <div
        className="row justify-content-between flex-column flex-md-row gap-3 gap-md-4"
        style={{ gap: undefined }}
      >
        {/* Левый столбец: заказы и бонусы */}
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
          {user.bonuses && user.bonuses.length > 0 ? (
            <div>
              <div className="mb-2">Доступно: {user.bonuses.filter(b => (!b.expiresAt || b.expiresAt > Date.now())).reduce((sum, b) => sum + (b.amount - (b.usedAmount || 0)), 0)} Ctrl Coins</div>
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
                    {user.bonuses.map(bonus => (
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
                <a href="/loyalty" className="text-primary" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                  г) Условия получения бонусов
                </a>
              </div>
            </div>
          ) : (
            <div>У вас пока нет бонусов.</div>
          )}
        </div>
        {/* Правый столбец: персональные данные */}
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
            <div className="d-flex align-items-center" style={{ gap: 8 }}>
              <select
                className="form-select"
                style={{ maxWidth: 110, minWidth: 80, opacity: editMode ? 1 : 0.6, background: editMode ? undefined : '#f8f9fa', borderColor: '#ced4da' }}
                value={phoneCode}
                disabled={!editMode}
                onChange={e => setPhoneCode(e.target.value)}
              >
                {PHONE_CODES.map(c => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
              <input
                type='text'
                className='form-control'
                value={phoneNumber}
                disabled={!editMode}
                onChange={handlePhoneInput}
                placeholder={getPhonePlaceholder() + ' (номер)'}
                style={{ opacity: editMode ? 1 : 0.6, background: editMode ? undefined : '#f8f9fa' }}
                maxLength={PHONE_MASKS[phoneCode]?.mask.replace(/[^9]/g, '').length || 15}
              />
            </div>
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
              ref={birthdateInputRef}
              placeholder="1990-01-01"
            />
          </div>
          <div className='mb-3'>
            <label>Способ доставки:</label>
            <input
              type='text'
              className='form-control'
              value={deliveryType}
              disabled={!editMode}
              onChange={e => setDeliveryType(e.target.value)}
              style={{ opacity: editMode ? 1 : 0.6, background: editMode ? undefined : '#f8f9fa' }}
              placeholder="Курьер / Самовывоз"
            />
          </div>
          <div className='mb-3'>
            <label>Адрес доставки:</label>
            <input
              type='text'
              className='form-control'
              value={deliveryAddress}
              disabled={!editMode}
              onChange={e => setDeliveryAddress(e.target.value)}
              style={{ opacity: editMode ? 1 : 0.6, background: editMode ? undefined : '#f8f9fa' }}
              placeholder="г. Москва, ул. Пушкина, д. 1"
            />
          </div>
          <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center mt-3 gap-2 gap-md-0">
            {editMode ? (
              <Button
                black
                onMouseDown={() => { saveButtonMouseDown.current = true }}
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

          {/* Модалка смены пароля */}
          {showChangePassword && (
            <div style={{
              position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ background: '#fff', padding: 16, borderRadius: 12, minWidth: '90vw', maxWidth: 400, width: '100%' }} className="mx-2 mx-md-0">
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
                      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 4C5 4 1.73 8.11 1.13 8.94a1 1 0 0 0 0 1.12C1.73 11.89 5 16 10 16s8.27-4.11 8.87-4.94a1 1 0 0 0 0-1.12C18.27 8.11 15 4 10 4zm0 10c-3.31 0-6.13-2.94-7.19-4C3.87 8.94 6.69 6 10 6s6.13 2.94 7.19 4C16.13 11.06 13.31 14 10 14zm0-7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M2.39 1.73a1 1 0 0 0-1.41 1.41l2.06 2.06C2.73 6.11 1.13 8.11 1.13 8.94a1 1 0 0 0 0 1.12C1.73 11.89 5 16 10 16c1.61 0 3.09-.37 4.38-1l2.49 2.49a1 1 0 0 0 1.41-1.41l-16-16zM10 14c-3.31 0-6.13-2.94-7.19-4C3.87 8.94 6.69 6 10 6c.35 0 .69.03 1.03.08l1.56 1.56A3 3 0 0 0 10 7a3 3 0 0 0-3 3c0 .35.06.68.16 1l1.53 1.53A1 1 0 0 1 10 13a1 1 0 0 1-.16-1.97l1.53 1.53c-.32.1-.65.16-1 .16zm7.19-2c-1.06 1.06-3.88 4-7.19 4-.35 0-.68-.03-1.03-.08l-1.56-1.56A3 3 0 0 0 10 13a3 3 0 0 0 3-3c0-.35-.06-.68-.16-1l-1.53-1.53A1 1 0 0 1 10 7a1 1 0 0 1 .16 1.97l-1.53-1.53c.32-.1.65-.16 1-.16 3.31 0 6.13 2.94 7.19 4z"/></svg>
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
                      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 4C5 4 1.73 8.11 1.13 8.94a1 1 0 0 0 0 1.12C1.73 11.89 5 16 10 16s8.27-4.11 8.87-4.94a1 1 0 0 0 0-1.12C18.27 8.11 15 4 10 4zm0 10c-3.31 0-6.13-2.94-7.19-4C3.87 8.94 6.69 6 10 6s6.13 2.94 7.19 4C16.13 11.06 13.31 14 10 14zm0-7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M2.39 1.73a1 1 0 0 0-1.41 1.41l2.06 2.06C2.73 6.11 1.13 8.11 1.13 8.94a1 1 0 0 0 0 1.12C1.73 11.89 5 16 10 16c1.61 0 3.09-.37 4.38-1l2.49 2.49a1 1 0 0 0 1.41-1.41l-16-16zM10 14c-3.31 0-6.13-2.94-7.19-4C3.87 8.94 6.69 6 10 6c.35 0 .69.03 1.03.08l1.56 1.56A3 3 0 0 0 10 7a3 3 0 0 0-3 3c0 .35.06.68.16 1l1.53 1.53A1 1 0 0 1 10 13a1 1 0 0 1-.16-1.97l1.53 1.53c-.32.1-.65.16-1 .16zm7.19-2c-1.06 1.06-3.88 4-7.19 4-.35 0-.68-.03-1.03-.08l-1.56-1.56A3 3 0 0 0 10 13a3 3 0 0 0 3-3c0-.35-.06-.68-.16-1l-1.53-1.53A1 1 0 0 1 10 7a1 1 0 0 1 .16 1.97l-1.53-1.53c.32-.1.65-.16 1-.16 3.31 0 6.13 2.94 7.19 4z"/></svg>
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
                      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 4C5 4 1.73 8.11 1.13 8.94a1 1 0 0 0 0 1.12C1.73 11.89 5 16 10 16s8.27-4.11 8.87-4.94a1 1 0 0 0 0-1.12C18.27 8.11 15 4 10 4zm0 10c-3.31 0-6.13-2.94-7.19-4C3.87 8.94 6.69 6 10 6s6.13 2.94 7.19 4C16.13 11.06 13.31 14 10 14zm0-7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M2.39 1.73a1 1 0 0 0-1.41 1.41l2.06 2.06C2.73 6.11 1.13 8.11 1.13 8.94a1 1 0 0 0 0 1.12C1.73 11.89 5 16 10 16c1.61 0 3.09-.37 4.38-1l2.49 2.49a1 1 0 0 0 1.41-1.41l-16-16zM10 14c-3.31 0-6.13-2.94-7.19-4C3.87 8.94 6.69 6 10 6c.35 0 .69.03 1.03.08l1.56 1.56A3 3 0 0 0 10 7a3 3 0 0 0-3 3c0 .35.06.68.16 1l1.53 1.53A1 1 0 0 1 10 13a1 1 0 0 1-.16-1.97l1.53 1.53c-.32.1-.65.16-1 .16zm7.19-2c-1.06 1.06-3.88 4-7.19 4-.35 0-.68-.03-1.03-.08l-1.56-1.56A3 3 0 0 0 10 13a3 3 0 0 0 3-3c0-.35-.06-.68-.16-1l-1.53-1.53A1 1 0 0 1 10 7a1 1 0 0 1 .16 1.97l-1.53-1.53c.32-.1.65-.16 1-.16 3.31 0 6.13 2.94 7.19 4z"/></svg>
                    )}
                  </button>
                </div>
                {changePasswordError && <div className='text-danger mb-2'>{changePasswordError}</div>}
                {changePasswordSuccess && <div className='text-success mb-2'>{changePasswordSuccess}</div>}
                <div className='d-flex flex-column flex-md-row justify-content-between gap-2'>
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
