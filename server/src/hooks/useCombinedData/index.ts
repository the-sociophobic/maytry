import useContentful from '../useContentful'
import combineItems from './combineItems'
import storage from '../../utils/storage'
import { CombinedItemType } from '../../types/contentful.type'
import use1C from '../../hooks/use1C'


const useCombinedData = async () => {
  const local_combined_items = storage.read<CombinedItemType[]>('combined.json')
  const contentful = await useContentful()

  if (local_combined_items)
    return ({
      ...contentful,
      items: local_combined_items
    })
  
  const { items_from_1C } = await use1C()
  const items = await combineItems(contentful, items_from_1C)

  storage.write('combined.json', items)

  return ({
    ...contentful,
    items
  })
}


export default useCombinedData
