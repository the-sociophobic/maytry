import { Metadata } from 'next'

import { getContentfulDataWithoutBadItems } from '../hooks/useContentful'


const CUSTOM_PAGES_LINKS = [
  'contacts',
  'privacy-policy',
  'terms-of-service',
  'checkout',
  'cart',
  'success',
  '404',
]


export type GetMetadataReturnType = Metadata & {
  h1?: string
}


const getMetadataFromContentful = async (link: string): Promise<GetMetadataReturnType> => {
  const contentful = await getContentfulDataWithoutBadItems()

  if (!contentful)
    return metadataFallback

  if (link.includes('/product/')) {
    const productId = link.replace('/product/', '')
    const item = contentful.items.find(item => item.link === productId)
    
    if (!item)
      return metadataFallback

    return {
      h1: item.metaH1 || item.name || 'undefined item',
      title: item.metaTitle || `${item.name} — купить в бренде одежды MAYTRY`,
      description: item.metaDescription || `Купите ${item.name}. Подробности на сайте.` || 'undefined item description',
    }
  }

  if (link.includes('/faq') || CUSTOM_PAGES_LINKS.includes(link.replace('/', ''))) {
    const page = contentful.pages
      .find(page => page.link.link === link)
    
    const canonicalProps: Partial<Metadata> = page?.noindex ? {} : {
      alternates: { canonical: link }
    }
    return {
      h1: page?.metaH1 || 'undefined page',
      title: page?.metaTitle || 'undefined page title',
      description: page?.metaDescription || 'undefined page description',
      ...canonicalProps
    }
  }


  if (link === '/') {
    const site = contentful.sites[0]
    
    return {
      h1: site ? site.metaH1 : 'undefined site',
      title: site ? site.metaTitle : 'undefined site title',
      description: site ? site.metaDescription : 'undefined site description',
    }
  }

  if (link.includes('categoriya')) {
    const categoryLink = (link.split('categoriya/')[1]).split('?')[0]
    const subcategoryLink = link.split('?')[1]
    const category = contentful.categorys.find(category => category.link === categoryLink)
    const subcategory = contentful.categorys.find(category => category.link === subcategoryLink)
    const currentCategory = subcategory || category

    if (!currentCategory) {
      return metadataFallback
    }

    return {
      h1: currentCategory.metaH1,
      title: currentCategory.metaTitle,
      description: currentCategory.metaDescription,
    }
  }

  const hardcodedPage = metadataVocabulary[link]

  if (hardcodedPage)
    return hardcodedPage

  return metadataFallback
}


export default getMetadataFromContentful


const metadataFallback: GetMetadataReturnType = {
  h1: 'maytry h1',
  title: 'maytry: ',
  description: 'maytry page description'
}


const metadataVocabulary: { [key: string]: GetMetadataReturnType } = {
  '/login': {
    h1: 'Вход',
    title: 'maytry: вход',
    description: 'maytry вход'  
  },
  '/register': {
    h1: 'Регистрация',
    title: 'maytry: регистрация',
    description: 'maytry регистрация'  
  },
  '/account': {
    h1: 'Профиль',
    title: 'maytry: профиль',
    description: 'maytry профиль'  
  },
  '/cart': {
    h1: 'корзина',
    title: 'maytry: корзина',
    description: 'maytry корзина'  
  },
  '/checkout': {
    h1: 'заказ',
    title: 'maytry: заказ',
    description: 'maytry заказ'  
  },
  '/success': {
    h1: 'успех',
    title: 'maytry: успех',
    description: 'maytry успех'  
  },
  '/fail': {
    h1: 'неудача',
    title: 'maytry: неудача',
    description: 'maytry неудача'  
  },
  '/admin': {
    h1: 'Админ',
    title: 'maytry: админка',
    description: 'maytry админка'  
  },
}
