import axios from 'axios'

import { getProductsResponce, ParsedProductType } from '../types/products.type'
import getItemNameFrom1C from '../utils/getItemNameFrom1C'
import { getContentfulData } from '../utils/contentful'
import {
  ContentfulColorPriceSizeType,
  ContentfulColorType,
  ContentfulItemType,
  ContentfulSizeType,
  emptyColor,
  emptyContentfulItem,
  emptySize
} from '../types/contentful.type'


const { ONEC_PRODUCTS_URL, ONEC_USERNAME, ONEC_PASSWORD } = process.env

export const getProducts = async (): Promise<ParsedProductType[]> => {
  try {
    const { items: contentfulItems } = await getContentfulData<{items: ContentfulItemType[]}>('item')
    const { colors: contentfulColors } = await getContentfulData<{colors: ContentfulColorType[]}>('color')
    const { sizes: contentfulSizes } = await getContentfulData<{sizes: ContentfulSizeType[]}>('size')

    const { items: items_from_1C } = (await axios.get<getProductsResponce>(
      ONEC_PRODUCTS_URL,
      {
        auth: {
          username: ONEC_USERNAME,
          password: ONEC_PASSWORD
        }
      }
    )).data
    const items_from_1C_parsed_map = new Map<string, ContentfulItemType>()

    items_from_1C.forEach(item => {
      const itemName = getItemNameFrom1C(item)
      let item_in_map = items_from_1C_parsed_map.get(itemName)
      const color = contentfulColors.find(color => color.name === item.color) || emptyColor
      const size = contentfulSizes.find(size => size.name === item.size) || emptySize
      const color_price_size: ContentfulColorPriceSizeType = {
        color,
        price: item.price,
        size,
        max_available: item.count,
      }

      if (!item_in_map) {
        const contentfulItem = contentfulItems.find(item => item.name === itemName) || emptyContentfulItem

        item_in_map = {
          ...contentfulItem,
          color_price_size: []
        }
      }

      items_from_1C_parsed_map.set(itemName, {
        ...item_in_map,
        color_price_size: [...item_in_map.color_price_size, color_price_size]
      })
    })

    return [...items_from_1C_parsed_map].map(([_name, value]) => value)

  } catch (err) {
    console.log(err);
  }
}