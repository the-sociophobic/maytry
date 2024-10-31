import {
  ContentfulCategoryType,
  ContentfulColorPriceSizeType,
  ContentfulColorType,
  ContentfulDataType,
  ContentfulImageType,
  ContentfulItemType,
  ContentfulLinkType,
  ContentfulPageType,
  ContentfulSiteType,
  ContentfulSizeType,
} from '../types/contentful.type'
import { getContentfulData } from '../utils/contentful'
import storage from '../utils/storage'


const useContentful = async (): Promise<ContentfulDataType> => {
  const local_contentful_data = storage.read('contentful.json') as ContentfulDataType | undefined

  if (local_contentful_data)
    return local_contentful_data

  const contentful_data: ContentfulDataType = {
    ...(await getContentfulData<{ sites: ContentfulSiteType[] }>('site')),
    ...(await getContentfulData<{ items: ContentfulItemType[] }>('item')),
    ...(await getContentfulData<{ images: ContentfulImageType[] }>('image')),
    ...(await getContentfulData<{ itemColorPrices: ContentfulColorPriceSizeType[] }>('itemColorPrice')),
    ...(await getContentfulData<{ colors: ContentfulColorType[] }>('color')),
    ...(await getContentfulData<{ categorys: ContentfulCategoryType[] }>('category')),
    ...(await getContentfulData<{ sizes: ContentfulSizeType[] }>('size')),
    ...(await getContentfulData<{ links: ContentfulLinkType[] }>('link')),
    ...(await getContentfulData<{ pages: ContentfulPageType[] }>('page')),
  }

  storage.write('contentful.json', contentful_data)

  return contentful_data
}


export default useContentful
