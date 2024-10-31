import useContentful from '../hooks/useContentful'
import use1C from '../hooks/use1C'
import { getItemNumberFrom1C } from '../utils/getItemNameFrom1C'
import {
  ContentfulColorPriceSizeType,
} from '../types/contentful.type'
import { CombinedItemType } from '../types/combined.type'
import storage from '../utils/storage'
import {
  emptyContentfulItem,
  emptyColor,
  emptySize
} from '../utils/defaultValues'


const SIZES_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']


const useCombinedItems = async (): Promise<CombinedItemType[]> => {
  const local_combined_items = storage.read<CombinedItemType[]>('combined.json')

  if (local_combined_items)
    return local_combined_items

  try {
    const {
      items: contentfulItems,
      colors: contentfulColors,
      sizes: contentfulSizes,
      itemColorPrices: contentfulColorPriceSizes
    } = await useContentful()
    const { items_from_1C } = await use1C()
    const items_combined = new Map<string, CombinedItemType>()

    items_from_1C.forEach(oneC_item => {
      const item_number = getItemNumberFrom1C(oneC_item)
      let item_in_map = items_combined.get(item_number)
      const color = contentfulColors.find(color => color.name === oneC_item.color) || {
        ...emptyColor,
        name: oneC_item.color + ' нет в contentful'
      }
      const size = contentfulSizes.find(size => size.name === oneC_item.size) || emptySize
      const contentfulColorPriceSize = contentfulColorPriceSizes
        .find(c_p_s =>
          c_p_s.color.name === oneC_item.color &&
          c_p_s.size.name === oneC_item.size &&
          c_p_s.item_number === item_number
        )
      
      const color_price_size: ContentfulColorPriceSizeType = {
        id: oneC_item.code,
        name: '',
        item_number,
        ...contentfulColorPriceSize,
        color,
        price: oneC_item.price,
        size,
        max_available: oneC_item.count,
      }

      if (!item_in_map) {
        const contentfulItem = contentfulItems
          // .find(item => [item_number, item_numberInverted].includes(item.name)) || emptyContentfulItem
          .find(item => item.name.includes(item_number)) || emptyContentfulItem

        item_in_map = {
          ...contentfulItem,
          name: contentfulItem.name.length > 0 ? contentfulItem.name : item_number,
          link: contentfulItem.link.length > 0 ? contentfulItem.link : item_number,
          color_price_size: [],
          oneC_item
        }
      }

      items_combined.set(item_number, {
        ...item_in_map,
        color_price_size: [
          ...item_in_map.color_price_size,
          color_price_size
        ]
      })
    })

    const result = [...items_combined].map(([_name, value]) => ({
      ...value,
      color_price_size: value.color_price_size
        .sort((a, b) => SIZES_ORDER.indexOf(a.size.name) - SIZES_ORDER.indexOf(b.size.name))
    }))

    storage.write('combined.json', result)

    return result

  } catch (err) {
    console.log(err)
  }
}


export default useCombinedItems
