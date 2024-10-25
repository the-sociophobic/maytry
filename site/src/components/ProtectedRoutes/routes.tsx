import Login from '../../pages/Login'
import Cart from '../../pages/Cart'
import Main from '../../pages/Main'
import Register from '../../pages/Register'
import Account from '../../pages/Account'
import Redirect from '../Redirect'
import Success from '../../pages/Success'
import Fail from '../../pages/Fail'
import Admin from '../../pages/Admin'
import Details from '../../pages/Details'
import BoxberrySelect from '../../pages/BoxberrySelect'


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
    to: '/details',
    title: 'Данные покупателя',
    Comp: <Details />,
  },
  {
    to: '/boxberry-select',
    title: 'Выбор пункта Boxberry',
    Comp: <BoxberrySelect />,
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
  {
    to: '/*',
    title: 'redirect',
    Comp: <Redirect to='/' />,
  },
]


export default routes
