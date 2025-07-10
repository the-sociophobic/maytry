import Login from '../../../login/page'
import Cart from '../../../cart/page'
import Main from '../../../page'
import Register from '../../../register/page'
import Account from '../../../account/page'
// import Redirect from '../Redirect/page'
import Success from '../../../success/page'
import Fail from '../../../fail/page'
import Admin from '../../../admin/page'
import Checkout from '../../../checkout/page'


export type RouteType = {
  to: string
  title: string
  Comp: any
  exact?: boolean
}


const routes: RouteType[] = [
  {
    to: '/login',
    title: 'Вход',
    Comp: <Login />,
  },
  {
    to: '/register',
    title: 'Регистрация',
    Comp: <Register />,
  },
  {
    to: '/account',
    title: 'Аккаунт',
    Comp: <Account />,
  },
  {
    to: '/cart',
    title: 'Корзина',
    Comp: <Cart />,
  },
  {
    to: '/checkout',
    title: 'Оформление заказа',
    Comp: <Checkout />,
  },
  {
    to: '/success',
    title: 'Заказ оформлен',
    Comp: <Success />,
  },
  {
    to: '/fail',
    title: 'Что-то пошло не так',
    Comp: <Fail />,
  },
  {
    to: '/account',
    title: 'Корзина',
    Comp: <Cart />,
  },
  {
    to: '/admin',
    title: 'Кабинет',
    Comp: <Admin />,
  },
  {
    to: '/',
    exact: true,
    title: 'main',
    Comp: <Main />,
  },
  // {
  //   to: '/*',
  //   title: 'redirect',
  //   Comp: <Redirect to='/' />,
  // },
]


export default routes
