import { useQuery } from 'react-query'
import axios from 'axios'

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
import isProd from '../../utils/isProd'


export type ContentfulType = {
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


const dataURL = isProd() ?
  'https://hyperdao.xyz/maytry/data'
  :
  'http://localhost:5010/data'

const getContentfulDataWithoutBadItems = async () => {
  const data = (await axios.get<ContentfulType>(dataURL)).data
  const badItemsIds = data.items
    .filter(item =>
      !item.color_price_size ||
      item.color_price_size?.length === 0 ||
      item.color_price_size.some(c_p_s => !c_p_s.color || !c_p_s.size)
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
