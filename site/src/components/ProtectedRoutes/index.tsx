import React, { useEffect, useMemo } from 'react'

import { RouterProvider, createHashRouter } from 'react-router-dom'

import useStore from '../../hooks/useStore'
import Loader from '../Loader'
import routes, { RouteType } from './routes'
import Layout from '../Layout'
import useContentful, { ContentfulDataType } from '../../hooks/useContentful'
import Item from '../../pages/Item'
import PageTemplate from '../PageTemplate'
import Redirect from '../Redirect'


export type ProtectedRoutesProps = {
  contentRef: React.RefObject<HTMLDivElement>
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {
  const { user } = useStore()
  const { data: contentful } = useContentful()

  useEffect(() => useStore.setState({ user }), [user])
  
  const router = useMemo(
    () => createHashRouter(
      mapRoutes([
        ...(user ?
          routes.slice(2)
          :
          routes.filter(route => route.to !== '/account')
        ),
        ...(!contentful ? [] : mapContentfulRoutes(contentful))
      ])
    )
    , [contentful, user]
  )

  if (!contentful)
    return <Loader />

  return <RouterProvider router={router} />
}


export default ProtectedRoutes


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

const mapContentfulRoutes = (contentful: ContentfulDataType) => [
  ...(contentful.items.map(item => ({
    to: item.link,
    title: item.name,
    Comp: <Item {...item} />
  })) || []),
  ...(contentful.pages.map(page => ({
    to: page.link.link,
    title: page.link.title,
    Comp: <PageTemplate {...page} />
  })) || [])
]