import { ContentfulDataTypeFE } from '@/app/lib/types/contentful.type'
import { parseCategoryHref, parseItemHref } from '../../utils/parseHref'


export type BreadcrumbType = {
  href: string
  label: string
}


const mainBreadcrumb: BreadcrumbType = {
  href: '/',
  label: 'Главная'
}

export const parsePathname = (
  pathname: string,
  contentful: ContentfulDataTypeFE
): BreadcrumbType[] => {
  let breadcrumbs: BreadcrumbType[] = []

  if (pathname.includes('categoriya/')) {
    breadcrumbs = parseCategory(pathname.split('/').slice(-2)[0], contentful)
  }

  if (pathname.includes('product/')) {
    breadcrumbs = parseItem(pathname.split('/').slice(-2)[0], contentful)
  }

  if (pathname.includes('faq/')) {
    breadcrumbs = parseFAQ(pathname.slice(0, -1), contentful)
  }

  return [
    mainBreadcrumb,
    ...breadcrumbs
  ]
}


const parseItem = (
  itemLink: string,
  contentful: ContentfulDataTypeFE
): BreadcrumbType[] => {
  const item = contentful.items.find(item => item.link === itemLink)
  
  if (!item)
    return []

  const itemBreadcrumb = {
    href: parseItemHref(item),
    label: item.name
  }
  const category = item.categories
    .find(category => category.subcategories?.length > 0)

  if (!category)
    return [itemBreadcrumb]

  const categoryBreadcrumb = {
    href: parseCategoryHref(category),
    label: category.name
  }

  return [
    categoryBreadcrumb,
    itemBreadcrumb
  ]
}


const parseFAQ = (
  pageLink: string,
  contentful: ContentfulDataTypeFE
): BreadcrumbType[] => {
  const faqRoot = contentful.pages.find(page => page.link.link === '/faq')
  
  if (!faqRoot)
    return []

  const faqBreadcrumb = {
    href: faqRoot.link.link,
    label: faqRoot.title
  }
  const page = contentful.pages.find(page => page.link.link === pageLink)
  
  if (!page)
    return [faqBreadcrumb]

  const pageBreadcrumb = {
    href: page.link.link,
    label: page.title
  }

  return [
    faqBreadcrumb,
    pageBreadcrumb
  ]
}

const parseCategory = (
  categoryLink: string,
  contentful: ContentfulDataTypeFE
): BreadcrumbType[] => {
  const category = contentful.categorys
    .find(category => category.link === categoryLink)

  if (!category)
    return []

  const categoryBreadcrumb = {
    href: category.link!,
    label: category.name
  }

  return [categoryBreadcrumb]
}
