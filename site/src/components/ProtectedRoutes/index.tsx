import React, { useEffect, useMemo } from 'react'

import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import Loader from '../Loader'
import routes, { RouteType } from './routes'
import Layout from '../Layout'
import useContentful from '../../hooks/useContentful'
import Item from '../../pages/Item'
import PageTemplate from '../PageTemplate'
import Redirect from '../Redirect'
import { ContentfulDataTypeFE } from '../../types/contentful.type'
import useUser from '../../hooks/user/useUser'
import useStore from '../../hooks/useStore'


const ProtectedRoutes: React.FC = () => {
  const { data: user, isLoading: userIsLoading } = useUser()
  const { data: contentful } = useContentful()
  const { logged } = useStore()
  const { setLogged } = useStore()

  useEffect(() => {
    if (userIsLoading)
      return

    if (logged !== !!user)
      setLogged(!!user)
  }, [logged, setLogged, user, userIsLoading])
  
  const router = useMemo(
    () => {
      const routesMapped = mapRoutes([
        ...routes,
        ...(!contentful ? [] : mapContentfulRoutes(contentful))
      ])
      
      const router = createBrowserRouter(
        routesMapped,
        // Updating to react-router 7 tutorial
        // { future: {
        //   v7_relativeSplatPath: true,
        //   v7_fetcherPersist: true,
        //   v7_normalizeFormMethod: true,
        //   v7_partialHydration: true,
        //   v7_skipActionErrorRevalidation: true,
        // } },
      )

      return router
    }
    , [contentful]
  )

  if (!contentful)
    return <Loader />

  return (
    <RouterProvider
      router={router}
      // future={{ v7_startTransition: true }} // Updating to react-router 7 tutorial
    />
  )
}


export default ProtectedRoutes


const mapRoutes = (
  routes: RouteType[],
) =>
  routes.map(route => ({
    key: route.to,
    // path: '..' + route.to, // Updating to react-router 7 tutorial
    path: route.to,
    title: 'maytry: ' + (route.title || ''),
    element: (
      <Layout title={route.title} >
        {route.Comp}
      </Layout>
    ),
    errorElement: <Redirect to='/' />
  }))

const mapContentfulRoutes = (contentful: ContentfulDataTypeFE) => [
  ...(contentful.items.map(item => ({
    to: '/item/' + item.link,
    title: item.name,
    Comp: <Item {...item} />
  })) || []),
  ...(contentful.pages.map(page => ({
    to: page.link.link,
    title: page.link.title,
    Comp: <PageTemplate {...page} />
  })) || [])
]
