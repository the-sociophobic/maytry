import { headers } from 'next/headers'


// Пока что не работает
const getPathnameOnServer = async () => {
  const heads = await headers()
  const pathname = heads.get('next-url')
  console.log(heads.get("x-invoke-path"))

  return pathname || '/'
}


export default getPathnameOnServer
