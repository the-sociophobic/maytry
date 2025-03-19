import { CombinedItemType, ContentfulColorPriceSizeType } from './contentful.type'


export type ItemInCartType = Omit<CombinedItemType,
  | 'color_price_size'
  | 'defaultPrice'
  | 'defaultSalePrice'
> & ContentfulColorPriceSizeType & {
  quantity: number
}
