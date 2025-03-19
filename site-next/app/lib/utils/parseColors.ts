import { isEqual } from 'lodash'

import { ContentfulColorPriceSizeType, ParsedColorType } from '../types/contentful.type'


const parseColors = (color_price_size: ContentfulColorPriceSizeType[] | undefined) => {
  let colors: ParsedColorType[] = []

  if (color_price_size) {
    colors = Array.from(new Set(color_price_size.map(c_p_s => c_p_s.color?.id)))
      .map(colorId => {
        const color = color_price_size
          .find(c_p_s => c_p_s.color?.id === colorId)!.color

        return ({
          color,
          sizes: color_price_size
            .filter(c_p_s => isEqual(c_p_s.color, color))
            .map(c_p_s => ({
              id: c_p_s.id,
              size: c_p_s.size,
              price: c_p_s.price,
              salePrice: c_p_s.salePrice,
              max_available: c_p_s.max_available,
            }))
        })
      })
      .filter(colorSizes => !!colorSizes.color)
  }

  return colors
}


export default parseColors
