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
import { get } from '../../utils/requests'


export type ContentfulDataType = {
  sites: SiteType[]
  items: ItemType[]
  images: ImageType[]
  itemColorPrices: ColorPriceSizeType[]
  colors: ColorType[]
  categorys: CategoryType[]
  sizes: SizeType[]
  links: LinkType[]
  pages: PageType[]
}


const getContentfulDataWithoutBadItems = async () => {
  const data = await get<ContentfulDataType>('/data')
  const badItemsIds = data.items
    .filter(item =>
      !item.color_price_size ||
      item.color_price_size?.length === 0 ||
      item.color_price_size.some(c_p_s => !c_p_s.color || !c_p_s.size)
    )
    .map(item => item.id)
  const filteredData = {
    ...data,
    items: data.items
      .filter(item => !badItemsIds.includes(item.id))
      .map(item => ({
        ...item,
        link: item.link.replace('/', '')
      }))
  }

  // console.log(filteredData)

  return filteredData
}

const useContentful = () => {
  return useQuery<ContentfulDataType>('contentful', getContentfulDataWithoutBadItems)
}

const useMainPage = () => {
  return useQuery<SiteType>('contentful', async () => {
    const data = await getContentfulData<ContentfulDataType>()
  
    return data.sites[0]
  })
}


export default useContentful

export {
  useMainPage
}
