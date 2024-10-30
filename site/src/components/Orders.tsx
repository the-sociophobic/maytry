import { FC } from 'react'

import useOrders from '../hooks/useOrders'
import { printPrice } from '../utils/price'
import useContentful from '../hooks/useContentful'


export type OrdersProps = {}


const Orders: FC<OrdersProps> = ({

}) => {
  const { data: orders } = useOrders()
  const { data: contentful } = useContentful()

  return (
    <div className='Orders'>
      {orders?.map(order =>
        <div
          key={order.parcel.label}
          className='Orders__item'
        >
          <div className='col-1 mb-2'>
            order_id:<br />
            {order.details.order_id}
          </div>
          <div className='col-1'>
            items: {order.details.items.map(item => {
              const original_item = contentful?.items
                .find(contentful_item => contentful_item.id === item.id)
              console.log(original_item)
              console.log(item.id)
              
              return (
                <div
                  key={item.id}
                  className=''
                >
                  {item.name} × {item.quantity}
                </div>
              )
            })}
          </div>

          {Object.entries({
            ...order.details,
            ...order.parcel,
          })
            .filter(([key]) => !['order_id', 'items'].includes(key))
            .map(([key, value]) =>
              <div
                key={key}
                className='col-1 mb-2'
              >
                {key}:<br />
                {['price', 'payment_sum', 'delivery_sum'].includes(key) ?
                  printPrice(value as number)
                  :
                  value as string
                }
              </div>
            )}
        </div>
      )}
    </div>
  )
}


export default Orders
