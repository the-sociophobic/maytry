import axios from 'axios'

import storage from '../utils/storage'
import { OneCItemType } from '../types/oneC.type'


const { ONEC_PRODUCTS_URL, ONEC_USERNAME, ONEC_PASSWORD } = process.env


export type OneCDataType = {
  items_from_1C: OneCItemType[]
}


const use1C = async () => {
  const localStorage = storage.read('1C.json') as OneCDataType | undefined

  if (localStorage?.items_from_1C)
    return ({
      items_from_1C: localStorage.items_from_1C
    })

  const items_from_1C = await get1C()

  storage.write('1C.json', { items_from_1C })

  return ({
    items_from_1C
  })
}

export type getOneCDataType = {
  items_count: number
  items: OneCItemType[]
}

const get1C = async () => {
  const { items: items_from_1C } = (await axios.get<getOneCDataType>(
    ONEC_PRODUCTS_URL,
    {
      auth: {
        username: ONEC_USERNAME,
        password: ONEC_PASSWORD
      }
    }
  )).data
  
  return items_from_1C
}


export default use1C
