import { useQuery } from 'react-query'

import { getContentfulData } from './helpers'
import {
  CategoryType,
  ColorPriceSizeType,
  ColorType,
  ImageType,
  ItemType,
  LinkType,
  PageType,
  SiteType,
  SizeType
} from './types'


export type ContentfulType = {
  sites: SiteType[]
  items: ItemType[]
  images: ImageType[]
  ColorPriceSize: ColorPriceSizeType[]
  colors: ColorType[]
  categories: CategoryType[]
  sizes: SizeType[]
  links: LinkType[]
  pages: PageType[]
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
