import { useQuery } from '@tanstack/react-query'
import { get } from '../utils/requests'


const useUserIP = () => {
  return useQuery({
    queryKey: ['ip'],
    queryFn: getUserIP
  })
}


export default useUserIP


export type getUserIPResponceType = {
  ip: string
}

const getUserIP = async () => {
  let ip: null | string = null

  try {
    const resString = await get<string>('https://api.ipify.org?format=jsonp&callback=?')
    const resStringClean = resString.replace(/\?|\(|\)|;/g, '')
    const resObj: getUserIPResponceType = JSON.parse(resStringClean)
    
    ip = resObj.ip || null
  } catch (err) {
    console.log('getUserIP error: ', err)
  }

  console.log('user ip: ', ip)

  return ip
}
  
