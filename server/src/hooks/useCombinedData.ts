import useContentful from './useContentful'
import useCombinedItems from './useCombinedItems'


const useCombinedData = async () => {
  const contentful = await useContentful()
  const items = await useCombinedItems()

  return ({
    ...contentful,
    items
  })
}


export default useCombinedData
