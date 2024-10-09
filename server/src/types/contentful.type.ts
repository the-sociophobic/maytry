interface ContentfulItem {
  id: string
}

interface ContentfulFile extends ContentfulItem {
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


interface ContentfulSiteType extends ContentfulItem {
  title: string
  main_image: string
  header_filter_categories: ContentfulCategoryType[]
  main_page_items: ContentfulItemType[]
  footer_links: ContentfulLinkType[]
  pages: ContentfulPageType[]
}

export interface ContentfulItemType extends ContentfulItem {
  link: string
  name: string
  description: string
  categories: ContentfulCategoryType[]
  images: ContentfulImageType[]
  color_price_size?: ContentfulColorPriceSizeType[]
  defaultPrice?: number
  defaultSalePrice?: number
}
export const emptyContentfulItem = {
  id: '',
  link: '',
  name: '',
  description: '',
  categories: [],
  images: []
}

interface ContentfulImageType extends ContentfulItem {
  title: string
  small: ContentfulFile
  large?: ContentfulFile
}

export interface ContentfulColorPriceSizeType {
  // name: string
  color?: ContentfulColorType
  price: number
  salePrice?: number
  size: ContentfulSizeType
  max_available: number
}

export interface ContentfulColorType extends ContentfulItem {
  name: string
  colorCode: string
}
export const emptyColor: ContentfulColorType = {
  id: '0',
  name: 'чёрный',
  colorCode: '#000000'
}

interface ContentfulCategoryType extends ContentfulItem {
  name: string
  subcategories: ContentfulCategoryType[]
}

export interface ContentfulSizeType extends ContentfulItem {
  name: string
}
export const emptySize: ContentfulSizeType = {
  id: '0',
  name: 'L',
}


interface ContentfulLinkType extends ContentfulItem {
  link: string
  title: string
  new_line: boolean
}

interface ContentfulPageType extends ContentfulItem {
  link: ContentfulLinkType
  title: string
  // text: JSX.Element
  items: ContentfulItemType[]
}

export type ContentfulType = {
  sites: ContentfulSiteType[]
  items: ContentfulItemType[]
  images: ContentfulImageType[]
  ColorPriceSize: ContentfulColorPriceSizeType[]
  colors: ContentfulColorType[]
  categorys: ContentfulCategoryType[]
  sizes: ContentfulSizeType[]
  links: ContentfulLinkType[]
  pages: ContentfulPageType[]
}