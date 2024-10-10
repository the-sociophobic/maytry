

export interface ContentfulItem {
  id: string
}

export interface File extends ContentfulItem {
  file: {
    contentType: string
    details: {
      size: number
      image?: {
        width: number
        height: number
      }
    }
    fileName: string
    url: string
  }
  title: string
}


export interface SiteType extends ContentfulItem {
  title: string
  main_image: string
  header_filter_categories: CategoryType[]
  main_page_items: ItemType[]
  footer_links: LinkType[]
  pages: PageType[]
}

export type ItemType = ContentfulItemType & {
  oneC_item?: OneCItemType
}

export interface ContentfulItemType extends ContentfulItem {
  link: string
  name: string
  description: string
  categories: CategoryType[]
  images: ImageType[]
  color_price_size?: ColorPriceSizeType[]
  defaultPrice?: number
  defaultSalePrice?: number
}

export type OneCItemType = {
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


export interface ImageType extends ContentfulItem {
  title: string
  small: File
  large?: File
}

export interface ColorPriceSizeType extends ContentfulItem {
  name: string
  color?: ColorType
  price: number
  salePrice?: number
  size: SizeType
  max_available: number
}

export interface ColorType extends ContentfulItem {
  name: string
  colorCode: string
}

export interface CategoryType extends ContentfulItem {
  name: string
  subcategories: CategoryType[]
}

export interface SizeType extends ContentfulItem {
  name: string
}

export interface LinkType extends ContentfulItem {
  link: string
  title: string
  new_line: boolean
}

export interface PageType extends ContentfulItem {
  link: LinkType
  title: string
  text: JSX.Element
  items: ItemType[]
}
