import { ContentfulDataType } from '../types/contentful.type'
import { getContentfulData } from '../utils/contentful'
import storage from '../utils/storage'


const useContentful = async (): Promise<ContentfulDataType> => {
  const local_contentful_data = storage.read('contentful.json') as ContentfulDataType | undefined

  if (local_contentful_data)
    return local_contentful_data

  const contentful_data = await getContentfulData<ContentfulDataType>()

  storage.write('contentful.json', contentful_data)

  return contentful_data
}


export default useContentful
