import {
  ContentfulCategoryType,
  ContentfulColorPriceSizeType,
  ContentfulColorType,
  ContentfulDataTypeBE,
  ContentfulImageType,
  ContentfulItemType,
  ContentfulLinkType,
  ContentfulPageType,
  ContentfulPriceItemColorType,
  ContentfulPromocodeType,
  ContentfulSiteType,
  ContentfulSizeType,
} from '../types/contentful.type'
import { getContentfulData } from '../utils/contentful'
import storage from '../utils/storage'


const useContentful = async (): Promise<ContentfulDataTypeBE> => {
  const local_contentful_data = storage.read('contentful.json') as ContentfulDataTypeBE | undefined

  if (local_contentful_data)
    return local_contentful_data

  const promocodes = (await getContentfulData<{ trues: ContentfulPromocodeType[] }>('promocode')).trues

  const contentful_data: ContentfulDataTypeBE = {
    ...(await getContentfulData<{ sites: ContentfulSiteType[] }>('site')),
    ...(await getContentfulData<{ items: ContentfulItemType[] }>('item')),
    ...(await getContentfulData<{ images: ContentfulImageType[] }>('image')),
    ...(await getContentfulData<{ itemColorPrices: ContentfulColorPriceSizeType[] }>('itemColorPrice')),
    ...(await getContentfulData<{ colors: ContentfulColorType[] }>('color')),
    ...(await getContentfulData<{ categorys: ContentfulCategoryType[] }>('category')),
    ...(await getContentfulData<{ sizes: ContentfulSizeType[] }>('size')),
    ...(await getContentfulData<{ links: ContentfulLinkType[] }>('link')),
    ...(await getContentfulData<{ pages: ContentfulPageType[] }>('page')),
    ...(await getContentfulData<{ priceItemColors: ContentfulPriceItemColorType[] }>('priceItemColor')),
    // ...(await getContentfulData<{ promocodes: ContentfulPromocodeType[] }>('promocode')),
    ...({ promocodes })
  }

  // TODO почему-то с contentful приходят trues вместо promocodes
  console.log(Object.keys(contentful_data))

  await storage.write('contentful.json', contentful_data)

  return contentful_data
}


export default useContentful
