import {
  json as _json,
  // useLoaderData
} from 'react-router-dom'

import { ContentfulDataTypeFE } from '../types/contentful.type'
import getContentful from './getContentful'

import Item from '../pages/Item'
import PageTemplate from '../components/PageTemplate'
import routes, { RouteType } from '../components/ProtectedRoutes/routes'
import Layout from '../components/Layout'


const createServerRoutes = () => {
  const contentful = getContentful()

  const mappedRoutes = mapRoutes([
    ...routes,
    ...(!contentful ? [] : mapContentfulRoutes(contentful))
  ])
  
  return mappedRoutes
}

const serverRoutes = createServerRoutes()

export default serverRoutes

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

const mapRoutes = (
  routes: RouteType[],
) =>
  routes.map(route => ({
    // key: route.to,
    path: route.to,
    loader: () => {
      return _json({ message: "Welcome to React Router!" })
    },
    Component: () => (
      <Layout title={route.title} >
        {route.Comp}
      </Layout>
    ),
    // errorElement: <Redirect to='/' />
  }))