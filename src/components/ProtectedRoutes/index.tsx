import React, { useMemo } from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import useStore from '../../hooks/useStore'
import Loader from '../Loader'
import routes, { RouteType } from './routes'
import useUser from '../../hooks/useUser'
import Login from '../../pages/Login'


const mapRoutes = (routes: RouteType[]) =>
  routes.map(route => ({
    key: route.to,
    path: route.to,
    element: route.Comp    ,
    errorElement: <Login />
  }))

const ProtectedRoutes: React.FC = () => {
  const { data: user, isLoading: loadingUser } = useUser()

  const router = useMemo(
    () => createHashRouter(
      mapRoutes(user ? routes : routes.slice(-2))
    )
    , [user]
  )

  useStore.setState({ user })

  if (loadingUser)
    return <Loader />

  return <RouterProvider router={router} />
}


export default ProtectedRoutes
