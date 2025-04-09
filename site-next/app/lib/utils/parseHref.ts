import {
  CombinedItemType,
  ContentfulCategoryType
} from '../types/contentful.type'


export const parseItemHref = (item: CombinedItemType) =>
  `/product/${item.link}/`

export const parseCategoryHref = (category: ContentfulCategoryType) =>
  `/categoriya/${category.link}/`
