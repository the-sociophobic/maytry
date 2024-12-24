import { useQuery } from 'react-query'

import { get } from '../../utils/requests'
import {
  ContentfulCategoryType,
  ContentfulColorPriceSizeType,
  ContentfulColorType,
  ContentfulDataTypeFE,
  ContentfulImageType,
  ContentfulItemType,
  ContentfulLinkType,
  ContentfulPageType,
  ContentfulPriceItemColorType,
  ContentfulSiteType,
  ContentfulSizeType,
} from '../../types/contentful.type'


export const emptyContentful = {
  sites: [] as ContentfulSiteType[],
  items: [] as ContentfulItemType[],
  images: [] as ContentfulImageType[],
  itemColorPrices: [] as ContentfulColorPriceSizeType[],
  colors: [] as ContentfulColorType[],
  categorys: [] as ContentfulCategoryType[],
  sizes: [] as ContentfulSizeType[],
  links: [] as ContentfulLinkType[],
  pages: [] as ContentfulPageType[],
  priceItemColors: [] as ContentfulPriceItemColorType[]
}


const getContentfulDataWithoutBadItems = async () => {
  const data = await get<ContentfulDataTypeFE | undefined>('/data')

  if (!data?.items)
    return emptyContentful

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
  return useQuery<ContentfulDataTypeFE>('contentful', getContentfulDataWithoutBadItems)
}

// const useMainPage = () => {
//   return useQuery<ContentfulSiteType>('contentful', async () => {
//     const data = await getContentfulData<ContentfulDataTypeFE>()
  
//     return data.sites[0]
//   })
// }


export default useContentful

// export {
//   useMainPage
// }
