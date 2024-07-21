import { useQuery } from 'react-query'

import { getContentfulData } from './helpers'
import { ItemType, SiteType } from './types'


export type ContentfulType = {
  sites: SiteType[]
  items: ItemType[]
}

const useContentful = () => {
  return useQuery<ContentfulType>('contentful', getContentfulData<ContentfulType>)
}

const useMainPage = () => {
  return useQuery<SiteType>('contentful', async () => {
    const data = await getContentfulData<ContentfulType>()
  
    return data.sites[0]
  })
}


export default useContentful

export {
  useMainPage
}
