import { isEqual } from 'lodash'

import { ColorSizesProps } from '../components/ColorSizes'
import { ColorPriceSizeType } from '../hooks/useContentful/types'


const parseColors = (color_price_size: ColorPriceSizeType[] | undefined) => {
  let colors: ColorSizesProps[] = []

  if (color_price_size) {
    colors = Array.from(new Set(color_price_size.map(c_p_s => c_p_s.color?.id)))
      .map(colorId => {
        const color = color_price_size
          .find(c_p_s => c_p_s.color?.id === colorId)!.color

        return {
          color,
          sizes: color_price_size
            .filter(c_p_s => isEqual(c_p_s.color, color))
            .map(c_p_s => c_p_s.size)
        }
      })
      .filter(colorSizes => !!colorSizes.color)
  }

  return colors
}


export default parseColors
