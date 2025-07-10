import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from '../hooks/user/useUser'
import useStore from '../hooks/useStore'
import useUserOrders from '../hooks/user/useUserOrders'
import UserOrder from '../components/UserOrder'
import printTimestamp from '../utils/printTimestamp'
import useContentful from '../hooks/useContentful'


const Account: FC = () => {
  const { data: user } = useUser()
  const navigate = useNavigate()
  const { logged } = useStore()
  const { data } = useUserOrders()
  const orders = data?.orders
  const { data: contentful } = useContentful()

  useEffect(() => {
    if (!logged)
      navigate('/')
  }, [logged, navigate])

  return (!user || !orders || !contentful) ?
    <div>Не авторизован</div>
    :
    <div className='container'>
      <div className='row'>
        <h3 className='h3 mb-5'>
          Личный кабинет {user.email}
        </h3>
        <h3 className='h3 mb-5'>
          Заказы
        </h3>
        {orders
          .sort((a, b) => (b.timestamp || parseInt(b.order_id.slice(-3))) - (a.timestamp || parseInt(a.order_id.slice(-3))))
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
              <div
                key={order.order_id}
                className='row mt-5'
              >
                <div className='col col-xl-6 mt-5'>
                  <h3 className='h3 mb-2 mt-5'>
                    Заказ #{order.order_id} {order.timestamp ? ` (${printTimestamp(order.timestamp)})` : ''}
                  </h3>
                  <UserOrder
                    items={orderItemsWithImages}
                    totalPrice={order.price}
                  />
                </div>
              </div>
            )
          }
          )}
        <h3 className='h3 mb-5'>
          Бонусы
        </h3>
        {user.bonuses && user.bonuses.length > 0 ? (
          <div>
            <div>Доступно: {user.bonuses.filter(b => (!b.expiresAt || b.expiresAt > Date.now())).reduce((sum, b) => sum + (b.amount - (b.usedAmount || 0)), 0)} Ctrl Coins</div>
            <table style={{width: '100%', marginTop: 16, marginBottom: 32}}>
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
        ) : (
          <div>У вас пока нет бонусов.</div>
        )}
      </div>
    </div>
}


export default Account
