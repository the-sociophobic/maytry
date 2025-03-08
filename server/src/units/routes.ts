import Data from '../routes/Data'
import UpdateData from '../routes/UpdateData'
import UpdateCombinedData from '../routes/UpdateCombinedData'
import ParselCreate from '../routes/ParselCreate'
import DeliveryCalculation from '../routes/DeliveryCalculation'
import Orders from '../routes/Orders'
import OrdersIn1C from '../routes/OrdersIn1C'
import RegisterOrdersIn1C from '../routes/RegisterOrdersIn1C'
import CityByIP from '../routes/CityByIP'
import Login from '../routes/auth/Login'
import LoginAfterOrder from '../routes/auth/LoginAfterOrder'
import Register from '../routes/auth/Register'
import User from '../routes/auth/User'
import UserOrders from '../routes/auth/UserOrders'

import { RouteType } from '../types/routes.type'


const routes: RouteType[] = [
  {
    type: 'GET',
    path: '/data',
    fn: Data
  },
  {
    type: 'GET',
    path: '/update-data',
    fn: UpdateData
  },
  {
    type: 'GET',
    path: '/update-combined-data',
    fn: UpdateCombinedData
  },
  {
    type: 'POST',
    path: '/parsel-create',
    fn: ParselCreate
  },
  {
    type: 'POST',
    path: '/delivery-calculation',
    fn: DeliveryCalculation
  },
  {
    type: 'GET',
    path: '/orders',
    fn: Orders
  },
  {
    type: 'GET',
    path: '/orders-in-1C',
    fn: OrdersIn1C
  },
  {
    type: 'POST',
    path: '/register-orders-in-1C',
    fn: RegisterOrdersIn1C
  },
  {
    type: 'POST',
    path: '/city-by-ip',
    fn: CityByIP
  },
  
  // AUTHORIZATION START
  {
    type: 'POST',
    path: '/login',
    fn: Login
  },
  {
    type: 'POST',
    path: '/login-after-order',
    fn: LoginAfterOrder
  },
  {
    type: 'POST',
    path: '/register',
    fn: Register
  },
  {
    type: 'POST',
    path: '/user',
    fn: User
  },
  {
    type: 'POST',
    path: '/user-orders',
    fn: UserOrders
  },
  // AUTHORIZATION END
]


export default routes
