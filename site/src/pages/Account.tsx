import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'

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
      </div>
    </div>
}


export default Account
