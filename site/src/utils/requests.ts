import axios, { AxiosError } from 'axios'

import isProd from './isProd'
import { ResponseErrorType } from '../types/requests.type'


export const get = async <T>(path: string, params = {}) => {
  try {
    const res = await axios.get<T>(generateURL(path, params), getAuthHeader())

    return res.data
  } catch(error: any) {
    console.log('get request error: ', error)
    if (isBackendRequestURL(path) && axios.isAxiosError(error))
      throw (error as AxiosError<ResponseErrorType>).response?.data?.error
    else
      throw error
  }
}

export const post = async <T>(path: string, data: object) => {
  try {
    const res = await axios.post<T>(generateURL(path), data, getAuthHeader())

    return res.data
  } catch(error: any) {
    console.log('post request error: ', error)
    if (isBackendRequestURL(path) && axios.isAxiosError(error))
      throw (error as AxiosError<ResponseErrorType>).response?.data?.error
    else
      throw error
  }
}

export const put = async <T>(path: string, data: object) => {
  try {
    const res = await axios.put<T>(generateURL(path), data, getAuthHeader())

    return res.data
  } catch(error: any) {
    console.log('put request error: ', error)
    if (isBackendRequestURL(path) && axios.isAxiosError(error))
      throw (error as AxiosError<ResponseErrorType>).response?.data?.error
    else
      throw error
  }
}

export const deleteReq = async <T>(path: string) => {
  try {
    const res = await axios.delete<T>(generateURL(path), getAuthHeader())

    return res.data
  } catch(error: any) {
    console.log('delete request error: ', error)
    if (isBackendRequestURL(path) && axios.isAxiosError(error))
      throw (error as AxiosError<ResponseErrorType>).response?.data?.error
    else
      throw error
  }
}


export const BACKEND_URL = isProd() ?
  'https://hyperdao.xyz/maytry'
  :
  'http://localhost:5010'


export const isBackendRequestURL = (path: string) => !path.includes('https')

export const generateURL = (path: string, params?: object): string => {
  const isBackendRequestURLRes = isBackendRequestURL(path)

  if (!isBackendRequestURLRes)
    return path

  const backendRequestURLFormatted = BACKEND_URL +
    path +
    (params && Object.keys(params).length > 0 ?
      `?${new URLSearchParams(params as URLSearchParams).toString()}`
      :
      ''
    )
  
  return backendRequestURLFormatted
}
  

export const getAuthHeader = () => ({
  // headers: {
  //   userId: getUserId()
  // }
})

export const USER_ID_KEY = 'USER_ID'

export const getUserId = () => localStorage.getItem(USER_ID_KEY)
