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
  categorys: CategoryType[]
  sizes: SizeType[]
  links: LinkType[]
  pages: PageType[]
}

const getContentfulDataWithoutBadItems = async () => {
  const data = await getContentfulData<ContentfulType>()
  const badItemsIds = data.items
    .filter(item =>
      !item.color_price_size ||
      item.color_price_size?.length === 0 ||
      item.color_price_size.some(c_p_s => !c_p_s.color || !c_p_s.size || !c_p_s.price)
    )
    .map(item => item.id)

  return ({
    ...data,
    items: data.items.filter(item => !badItemsIds.includes(item.id)),
  })
}

const useContentful = () => {
  return useQuery<ContentfulType>('contentful', getContentfulDataWithoutBadItems)
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
