import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Почему-то не работает
  // console.log(request.url)
  // if(request.url !== request.url.toLowerCase()) {
  //   return NextResponse.redirect(new URL(request.nextUrl.origin + '/404'))
  // }
  // return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/:*',
}