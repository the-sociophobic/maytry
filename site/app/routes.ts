import {
  type RouteConfig,
  route
} from '@react-router/dev/routes'


export default [
  route('login', '../src/pages/Login.tsx'),
  route('register', '../src/pages/Register.tsx'),
  route('account', '../src/pages/Account.tsx'),
  route('cart', '../src/pages/Cart.tsx'),
  route('checkout', '../src/pages/Checkout.tsx'),
  route('success', '../src/pages/Success.tsx'),
  route('fail', '../src/pages/Fail.tsx'),
  route('admin', '../src/pages/Admin.tsx'),
  route('product/:productId', '../src/pages/Item.tsx'),
  route('pages/:pageId', '../src/components/PageTemplate.tsx'),
] satisfies RouteConfig
