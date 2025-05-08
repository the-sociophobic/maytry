import { useQuery } from '@tanstack/react-query'

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
  ContentfulPromocodeType,
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
  priceItemColors: [] as ContentfulPriceItemColorType[],
  promocodes: [] as ContentfulPromocodeType[]
}


export const getContentfulDataWithoutBadItems = async () => {
  let data: ContentfulDataTypeFE | undefined = emptyContentful
  let error = false
  let filteredData: ContentfulDataTypeFE = emptyContentful

  try {
    data = await get<ContentfulDataTypeFE | undefined>('/data')

    if (!data?.items) {
      error = true
    } else {
      const badItemsIds = data.items
        .filter(item =>
          !item.color_price_size ||
          item.color_price_size?.length === 0 ||
          item.color_price_size.some(c_p_s => !c_p_s.color || !c_p_s.size) ||
          !item.images
        )
        .map(item => item.id)

      filteredData = {
        ...data,
        items: data.items
          .filter(item => !badItemsIds.includes(item.id))
          .map(item => ({
            ...item,
            link: item.link.replace('/', '')
          }))
      }
    }
  } catch (err) {
    error = true
  }

  // console.log(filteredData)

  if (error)
    return emptyContentful
  else
    return filteredData
}

const useContentful = () => {
  return useQuery<ContentfulDataTypeFE>({
    queryKey: ['contentful'],
    queryFn: getContentfulDataWithoutBadItems
  })
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
