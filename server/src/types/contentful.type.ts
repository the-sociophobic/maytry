export type ContentfulDataType = {
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

export interface ContentfulColorPriceSizeType extends ContentfulItemClass {
  name: string
  item_number: string
  color?: ContentfulColorType
  price: number
  size: ContentfulSizeType
  salePrice?: number
  max_available: number
}
export interface ContentfulSizeType extends ContentfulItemClass {
  name: string
}
export const emptySize: ContentfulSizeType = {
  id: '0',
  name: '-',
}

export interface ContentfulColorType extends ContentfulItemClass {
  name: string
  colorCode: string
}
export const emptyColor: ContentfulColorType = {
  id: '0',
  name: '',
  colorCode: '#FF0000'
}

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


export interface ContentfulSiteType extends ContentfulItemClass {
  title: string
  main_image: string
  header_filter_categories: ContentfulCategoryType[]
  main_page_items: ContentfulItemType[]
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
  text: string
  items: ContentfulItemType[]
}
