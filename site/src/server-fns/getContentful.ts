import { ContentfulDataTypeBE } from '../types/contentful.type'
import storage from './storage'


const getContentful = () => {
  const local_contentful_data = storage.read('contentful.json') as ContentfulDataTypeBE | undefined

  return local_contentful_data
}


export default getContentful
