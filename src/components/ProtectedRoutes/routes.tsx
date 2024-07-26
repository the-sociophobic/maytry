import Login from '../../pages/Login'
import Cart from '../../pages/Cart'
import Main from '../../pages/Main'


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
    to: '/cart',
    title: 'Корзина',
    Comp: <Cart />,
  },
  {
    to: '/*',
    title: 'main',
    Comp: <Main />,
  },
]


export default routes
