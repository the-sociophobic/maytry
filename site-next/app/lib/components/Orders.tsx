'use client'

import { FC, useEffect, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import useOrders from '../hooks/useOrders'
import { printPrice } from '../utils/price'
import ColorSizes from './ColorSizes'
import Checkbox from './Checkbox'
import Button from './Button'
import useOrdersIn1C from '../hooks/useOrdersIn1C'
import { setsAreEqual, toggleInSet } from '../utils/sets'
import { post } from '../utils/requests'
import useStore from '../hooks/useStore'
import { ContentfulPromocodeType } from '../types/contentful.type'
import printTimestamp from '../utils/printTimestamp'


const Orders: FC = () => {
  const { data: orders } = useOrders()
  const { data: ordersIn1C } = useOrdersIn1C()
  const [checkedOrders, setCheckedOrders] = useState<string[]>([])

  useEffect(() => {
    if (ordersIn1C)
      setCheckedOrders(ordersIn1C)
  }, [ordersIn1C])

  const queryClient = useQueryClient()
  const { setIsLoading } = useStore()
  const syncOrdersIn1C = async () => {
    setIsLoading(true)
    try {
      await post('/register-orders-in-1C', { orders: checkedOrders })
      queryClient.invalidateQueries({ queryKey: ['orders-in-1C'] })
    } catch(err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  const { hideCheckedOrders } = useStore()
  const { setHideCheckedOrders } = useStore()

  return (
    <div className='Orders'>
      <div className='d-flex flex-row'>
        <Button
          black
          disabled={setsAreEqual(checkedOrders, ordersIn1C || [])}
          onClick={syncOrdersIn1C}
          className='me-3'
        >
          Сохранить изменения учитываемого ассортимента
        </Button>
        <Button
          black
          onClick={() => setHideCheckedOrders(!hideCheckedOrders)}
        >
          {`${hideCheckedOrders ? 'Отображать' : 'Скрывать'} учитываемый ассортимент`}
        </Button>
      </div>
      {orders
      ?.filter(order =>
        hideCheckedOrders && !!checkedOrders?.includes(order.order_id) ? false : true)
      ?.map((order, orderIndex) =>
        <div
          key={order.parcel.label + orderIndex}
          className='Orders__item'
        >
          <div className='col-1'>
            <Checkbox
              value={!!checkedOrders?.includes(order.order_id)}
              onChange={() => setCheckedOrders(toggleInSet(checkedOrders, order.order_id))}
              label='Не учитывать'
              disabled={!ordersIn1C}
            />
          </div>
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
          <div className='col-1'>
            time:<br />
            {printTimestamp(order.timestamp)}
          </div>


          {Object.entries({
            ...order,
            timestamp: undefined,
            registered_in_1C: undefined,
            parcel: undefined,
            ...order.parcel,
          })
            .filter(([key]) => !['order_id', 'items', 'timestamp'].includes(key))
            .map(([key, value]) =>
              <div
                key={key}
                className='col-1 mb-2'
              >
                {key}:<br />
                {['price', 'payment_sum', 'delivery_sum'].includes(key) ?
                  printPrice(value as number)
                  :
                  key === 'promocode' ?
                    (value as ContentfulPromocodeType).name
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
