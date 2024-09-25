

interface ContentfulItem {
  id: string
}

interface File extends ContentfulItem {
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


interface SiteType extends ContentfulItem {
  title: string
  main_image: string
  header_filter_categories: CategoryType[]
  main_page_items: ItemType[]
  footer_links: LinkType[]
  pages: PageType[]
}
interface ItemType extends ContentfulItem {
  link: string
  name: string
  description: string
  categories: CategoryType[]
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

interface ColorPriceSizeType extends ContentfulItem {
  name: string
  color?: ColorType
  price: number
  salePrice?: number
  size: SizeType
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

interface LinkType extends ContentfulItem {
  link: string
  title: string
  new_line: boolean
}

interface PageType extends ContentfulItem {
  link: LinkType
  title: string
  text: JSX.Element
  items: ItemType[]
}


export type {
  ContentfulItem,
  File,

  SiteType,
  ItemType,
  ImageType,
  ColorPriceSizeType,
  ColorType,
  CategoryType,
  SizeType,
  LinkType,
  PageType,
}