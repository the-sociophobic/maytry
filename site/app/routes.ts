import {
  type RouteConfig,
  route
} from '@react-router/dev/routes'


export default [
  route('login', '../src/pages/Login.tsx'),
  route('product/:productId', '../src/pages/Item.tsx'),
] satisfies RouteConfig
