export type ContentfulDataType = {
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

export interface ContentfulItemType extends ContentfulItemClass {
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

export interface ContentfulColorPriceSizeType {
  // name: string
  color?: ContentfulColorType
  price: number
  salePrice?: number
  size: ContentfulSizeType
  max_available: number
}
export interface ContentfulSizeType extends ContentfulItemClass {
  name: string
}
export const emptySize: ContentfulSizeType = {
  id: '0',
  name: 'L',
}

export interface ContentfulColorType extends ContentfulItemClass {
  name: string
  colorCode: string
}
export const emptyColor: ContentfulColorType = {
  id: '0',
  name: 'чёрный',
  colorCode: '#000000'
}

interface ContentfulItemClass {
  id: string
}

interface ContentfulFile extends ContentfulItemClass {
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


interface ContentfulSiteType extends ContentfulItemClass {
  title: string
  main_image: string
  header_filter_categories: ContentfulCategoryType[]
  main_page_items: ContentfulItemType[]
  footer_links: ContentfulLinkType[]
  pages: ContentfulPageType[]
}


interface ContentfulImageType extends ContentfulItemClass {
  title: string
  small: ContentfulFile
  large?: ContentfulFile
}

interface ContentfulCategoryType extends ContentfulItemClass {
  name: string
  subcategories: ContentfulCategoryType[]
}

interface ContentfulLinkType extends ContentfulItemClass {
  link: string
  title: string
  new_line: boolean
}

interface ContentfulPageType extends ContentfulItemClass {
  link: ContentfulLinkType
  title: string
  // text: JSX.Element
  items: ContentfulItemType[]
}
