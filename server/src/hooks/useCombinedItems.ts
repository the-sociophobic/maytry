import useContentful from '../hooks/useContentful'
import use1C from '../hooks/use1C'
import getItemNameFrom1C from '../utils/getItemNameFrom1C'
import {
  ContentfulColorPriceSizeType,
  emptyContentfulItem,
  emptyColor,
  emptySize
} from '../types/contentful.type'
import { CombinedItemType } from '../types/combined.type'


const useCombinedItems = async (): Promise<CombinedItemType[]> => {
  try {
    const {
      items: contentfulItems,
      colors: contentfulColors,
      sizes: contentfulSizes
    } = await useContentful()
    const { items_from_1C } = await use1C()
    const items_combined = new Map<string, CombinedItemType>()

    items_from_1C.forEach(oneC_item => {
      const itemName = getItemNameFrom1C(oneC_item)
      let item_in_map = items_combined.get(itemName)
      const color = contentfulColors.find(color => color.name === oneC_item.color) || emptyColor
      const size = contentfulSizes.find(size => size.name === oneC_item.size) || emptySize
      const color_price_size: ContentfulColorPriceSizeType = {
        color,
        price: oneC_item.price,
        size,
        max_available: oneC_item.count,
      }

      if (!item_in_map) {
        const contentfulItem = contentfulItems
          .find(item => item.name === itemName) || emptyContentfulItem

        item_in_map = {
          ...contentfulItem,
          color_price_size: [],
          oneC_item
        }
      }

      items_combined.set(itemName, {
        ...item_in_map,
        color_price_size: [
          ...item_in_map.color_price_size,
          color_price_size
        ]
      })
    })

    return [...items_combined].map(([_name, value]) => value)

  } catch (err) {
    console.log(err)
  }
}


export default useCombinedItems
