import { CombinedItemType } from '../types/contentful.type'


const sortMap = (itemsOrdered: ({ id: string })[]) => {
  const itemsOrder = itemsOrdered.map(item => item.id) || []
  const sortFn = (itemA: CombinedItemType, itemB: CombinedItemType) => {
    let indexA = itemsOrder.indexOf(itemA.id)
    let indexB = itemsOrder.indexOf(itemB.id)

    if (indexA === -1)
      indexA = itemsOrder.length
    if (indexB === -1)
      indexB = itemsOrder.length

    return indexA - indexB
  }

  return sortFn
}


export default sortMap
