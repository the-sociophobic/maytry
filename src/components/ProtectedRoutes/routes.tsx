import Login from '../../pages/Login'
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
    title: 'Проверка билета',
    Comp: <Login />,
  },
  {
    to: '/*',
    title: 'main',
    Comp: <Main />,
  },
]


export default routes
