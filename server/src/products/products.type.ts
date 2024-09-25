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

export type ParsedProductType = Pick<ItemType, 'name' | 'color_price_size'>


interface ContentfulItem {
  id: string
}

interface ItemType extends ContentfulItem {
  link: string
  name: string
  description: string
  // categories: CategoryType[]
  categories: string[]
  images: ImageType[]
  color_price_size?: ColorPriceSizeType[]
  defaultPrice?: number
  defaultSalePrice?: number
}

interface ImageType extends ContentfulItem {
  title: string
  small: File
  large?: File
}

// export interface ColorPriceSizeType extends ContentfulItem {
export interface ColorPriceSizeType {
  // name: string
  // color?: ColorType
  color?: string
  price: number
  // salePrice?: number
  // size: SizeType
  size: string
  max_available: number
}

interface ColorType extends ContentfulItem {
  name: string
  colorCode: string
}

interface CategoryType extends ContentfulItem {
  name: string
  subcategories: CategoryType[]
}

interface SizeType extends ContentfulItem {
  name: string
}