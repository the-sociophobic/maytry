import { useQuery } from 'react-query'
import { get } from '../utils/requests'


const useUserIP = () => {
  return useQuery('ip', getUserIP)
}


export default useUserIP


export type getUserIPResponceType = {
  ip: string
}

const getUserIP = async () => {
  let ip: undefined | string

  try {
    const resString = await get<string>('https://api.ipify.org?format=jsonp&callback=?')
    console.log(typeof resString)
    console.log(resString)
    const resStringClean = resString.replace(/\?|\(|\)|;/g, '')
    const resObj: getUserIPResponceType = JSON.parse(resStringClean)
    
    ip = resObj.ip
  } catch (err) {
    console.log('getUserIP error: ', err)
  }

  console.log('user ip: ', ip)

  return ip
}
  
