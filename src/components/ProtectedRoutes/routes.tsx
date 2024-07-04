import Login from '../../pages/Login'


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
    title: 'Проверка билета',
    Comp: <Login />,
  },
]


export default routes
