import { OneCItemType } from './oneC.type'


export interface ContentfulItemClass {
  id: string
}

export interface ContentfulFile extends ContentfulItemClass {
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

export type ContentfulDataTypeBE = {
  sites: ContentfulSiteType[]
  items: ContentfulItemType[]
  images: ContentfulImageType[]
  itemColorPrices: ContentfulColorPriceSizeType[]
  colors: ContentfulColorType[]
  categorys: ContentfulCategoryType[]
  sizes: ContentfulSizeType[]
  links: ContentfulLinkType[]
  pages: ContentfulPageType[]
}

export type ContentfulDataTypeFE = Omit<ContentfulDataTypeBE, 'items'> & {
  items: CombinedItemType[]
}

export type CombinedItemType = ContentfulItemType & {
  oneC_item?: OneCItemType
}

export interface ContentfulItemType extends ContentfulItemClass {
  link: string
  name: string
  description: string
  sizes?: SizesTableType
  categories: ContentfulCategoryType[]
  images: ContentfulImageType[]
  color_price_size?: ContentfulColorPriceSizeType[]
  defaultPrice?: number
  defaultSalePrice?: number
}

export type SizesTableType = { [key: string]: string[] }

export interface ContentfulColorType extends ContentfulItemClass {
  name: string
  colorCode: string
}

export interface ContentfulSizeType extends ContentfulItemClass {
  name: string
}

export interface ContentfulColorPriceSizeType extends ContentfulItemClass {
  name: string
  item_number: string
  color?: ContentfulColorType
  price: number
  size: ContentfulSizeType
  salePrice?: number
  max_available: number
}

export interface ContentfulSiteType extends ContentfulItemClass {
  title: string
  main_image: string
  header_filter_categories: ContentfulCategoryType[]
  extended_filter_categories: ContentfulCategoryType[]
  main_page_items: CombinedItemType[]
  footer_links: ContentfulLinkType[]
  pages: ContentfulPageType[]
}

export interface ContentfulImageType extends ContentfulItemClass {
  title: string
  small: ContentfulFile
  large?: ContentfulFile
}

export interface ContentfulCategoryType extends ContentfulItemClass {
  name: string
  subcategories: ContentfulCategoryType[]
}

export interface ContentfulLinkType extends ContentfulItemClass {
  link: string
  title: string
  new_line: boolean
}

export interface ContentfulPageType extends ContentfulItemClass {
  link: ContentfulLinkType
  title: string
  image?: ContentfulFile
  text: string
  items: CombinedItemType[]
}
