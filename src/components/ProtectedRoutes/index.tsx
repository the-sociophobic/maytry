import React, { useEffect, useMemo } from 'react'

import { RouterProvider, createHashRouter } from 'react-router-dom'

import useStore from '../../hooks/useStore'
// import Loader from '../Loader'
import routes, { RouteType } from './routes'
// import useUser from '../../hooks/useUser'
// import Login from '../../pages/Login'
import Layout from '../Layout'
import useContentful from '../../hooks/useContentful'
import Item from '../../pages/Item'
import PageTemplate from '../PageTemplate'
import Redirect from '../Redirect'


const mapRoutes = (
  routes: RouteType[],
) =>
  routes.map(route => ({
    key: route.to,
    path: route.to,
    element: (
      <Layout title={route.title} >
        {route.Comp}
      </Layout>
    ),
    errorElement: <Redirect to='/' />
  }))


export type ProtectedRoutesProps = {
  contentRef: React.RefObject<HTMLDivElement>
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {
  // const { data: user, isLoading: loadingUser } = useUser()
  const { user } = useStore()
  const { data: contentful } = useContentful()

  const router = useMemo(
    () => createHashRouter(
      // mapRoutes(user ? routes : routes.slice(-2))
      mapRoutes([
        ...(user ?
          routes.slice(2)
          :
          routes.filter(route => route.to !== '/account')
        ),
        ...(contentful?.items.map(item => ({
          to: item.link,
          title: item.name,
          Comp: <Item {...item} />
        })) || []),
        ...(contentful?.pages.map(page => ({
          to: page.link.link,
          title: page.link.title,
          Comp: <PageTemplate {...page} />
        })) || [])
      ])
    )
    , [contentful, user]
  )

  useEffect(() => useStore.setState({ user }), [user])
  

  // if (loadingUser)
  //   return <Loader />

  return <RouterProvider router={router} />
}


export default ProtectedRoutes
