import { ContentfulItemType } from './contentful.type'


export type getProductsResponce = {
  items_count: number
  items: ProductType[]
}

export type ProductType = {
  code: string
  category_name: string
  name: string
  price: number
  count: number
  barcode: string
  type_of_clothing: string
  seasonality: string
  color: string
  size: string
  size_real: number
  upper_fabric: string
  lining: string
  insulation: string
  manufacture_date: string
  height: number
  chest: number
  waist: number
}

export type ParsedProductType = Pick<ContentfulItemType, 'name' | 'color_price_size'>

