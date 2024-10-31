import { FC } from 'react'

import useOrders from '../hooks/useOrders'
import { printPrice } from '../utils/price'
import ColorSizes from './ColorSizes'


export type OrdersProps = {}


const Orders: FC<OrdersProps> = ({

}) => {
  const { data: orders } = useOrders()

  return (
    <div className='Orders'>
      {orders?.map(order =>
        <div
          key={order.parcel.label}
          className='Orders__item'
        >
          <div className='col-1 mb-2'>
            order_id:<br />
            {order.order_id}
          </div>
          <div className='col-1'>
            items: {order.items.map(item => {

              return (
                <div
                  key={item.id}
                  className='mb-3'
                >
                  {item.name} × {item.quantity}
                  <ColorSizes
                    colorAsText
                    color={item.color}
                    sizes={[item.size]}
                  />
                </div>
              )
            })}
          </div>

          {Object.entries({
            ...order,
            parcel: undefined,
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
