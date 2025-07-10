import { createClient } from 'contentful'
import _ from 'lodash'


const createContentfulClient = () =>
  createClient({
    space: '8atb7a9mpajr',
    accessToken: 'h0wdXspqiRwB18g2pZYWplLJbNXryLVki94KBLlEL7E',
    host: 'cdn.contentful.com',
  })

  const getContentfulItems = async <T>(client: any, options?: object): Promise<T> => {
    let itemsByType: {[key: string]: any} = {};
  
    (await client.getEntries(options)).items
      .forEach((item: any) => {
        const parsedItem: any = parseItem(item)
        const type = parsedItem.type + 's'
  
        itemsByType.hasOwnProperty(type) ?
          itemsByType[type].push(parsedItem)
          :
          itemsByType[type] = [parsedItem]
      })
  
    return itemsByType as T
  }
  
  const parseItem = (item: any) =>
    ({
      id: item.sys.id,
      type: item?.sys?.contentType?.sys?.id,
      ..._.mapValues(
        item.fields,
        field => Array.isArray(field) ?
          field.map(entry => parseField(entry))
          :
          parseField(field)
      )
    })
  
  const parseField = (field: any): string | any => {
    if (field?.sys?.id)
      return parseItem(field)
      
    switch(field?.nodeType || field?.sys?.type) {
      // case 'document':
      //   return parseContentfulText(field)
      case 'Asset':
        return field?.fields?.file
      default:
        return field
    }
  }
  
  // const parseContentfulText = (document: any) =>
  //   documentToReactComponents(document)
  
  
  
  const contentfulClient = createContentfulClient()
  
  const getContentfulData = async <T>(content_type?: string) => {
    return await getContentfulItems<T>(contentfulClient, content_type ? { content_type } : undefined)
  }
  
  
  export {
    getContentfulData
  }