import Login from '../../pages/Login'
import Cart from '../../pages/Cart'
import Main from '../../pages/Main'
import Register from '../../pages/Register'
import Account from '../../pages/Account'
import Redirect from '../Redirect'


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
    to: '/account',
    title: 'Корзина',
    Comp: <Cart />,
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
