

interface ContentfulItem {
  id: string
  name: string
  desc: JSX.Element
  url: string
}

interface File extends ContentfulItem {
  id: string
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
  header_filter_categories: CategoryType[]
  main_page_items: ItemType[]
  main_image: string
}
interface ItemType extends ContentfulItem {
  link: string
  name: string
  description: string
  price: number
  images: File[]
  categories: CategoryType[]
  available_sizes: SizeType[]
}

interface CategoryType extends ContentfulItem {
  name: string
  subcategories: CategoryType[]
}

interface SizeType extends ContentfulItem {
  name: string
}


export type {
  ContentfulItem,
  File,

  SiteType,
  ItemType,
  CategoryType,
  SizeType
}
