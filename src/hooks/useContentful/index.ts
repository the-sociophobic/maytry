import { useQuery } from 'react-query'

import { getContentfulData } from './helpers'
import { ItemType } from './types'


export type ContentfulType = {
  items: ItemType[]
}


const useContentful = () => {
  return useQuery<ContentfulType>('contentful', getContentfulData<ContentfulType>)
}


export default useContentful
