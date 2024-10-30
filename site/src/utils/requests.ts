import axios from 'axios'

import isProd from './isProd'


export const get = async <T>(path: string, params = {}) => {
  try {
    const res = await axios.get<T>(generateURL(path, params), getAuthHeader())

    return res.data
  } catch(error: any) {
    console.log(error)
    // throw new Error(error)
  }
}

export const post = async <T>(path: string, data: object) => {
  try {
    const res = await axios.post<T>(generateURL(path), data, getAuthHeader())

    return res.data
  } catch(error: any) {
    console.log(error)
    // throw new Error(error)
  }
}

export const put = async <T>(path: string, data: object) => {
  try {
    const res = await axios.put<T>(generateURL(path), data, getAuthHeader())

    return res.data
  } catch(error: any) {
    console.log(error)
    // throw new Error(error)
  }
}

export const deleteReq = async <T>(path: string) => {
  try {
    const res = await axios.delete<T>(generateURL(path), getAuthHeader())

    return res.data
  } catch(error: any) {
    console.log(error)
    // throw new Error(error)
  }
}


export const SERVER_URL = isProd() ?
  'https://hyperdao.xyz/maytry'
  :
  'http://localhost:5010'


export const generateURL = (path: string, params?: object): string =>
  SERVER_URL +
  path +
  (params && Object.keys(params).length > 0 ?
    `?${new URLSearchParams(params as URLSearchParams).toString()}`
    :
    ''
  )

export const getAuthHeader = () => ({
  headers: {
    // telegramData: encodeURIComponent(getAuthStringFromWebApp() || getAuthStringFromBrowser())
    userId: getUserId()
  }
})

export const USER_ID_KEY = 'USER_ID'

export const getUserId = () => localStorage.getItem(USER_ID_KEY)
