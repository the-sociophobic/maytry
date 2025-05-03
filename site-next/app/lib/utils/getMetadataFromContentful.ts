import { Metadata } from 'next'

import contentful from '@/app/lib/utils/preloaded/contentful'


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
  if (link.includes('/product/')) {
    const productId = link.replace('/product/', '')
    const item = contentful.items.find(item => item.link === productId)
    
    if (!item)
      return metadataFallback

    return {
      h1: item.metaH1 || item.name || 'undefined item',
      title: item.metaTitle || `${item.name} — купить в бренде одежды MAYTRY`,
      description: item.metaDescription || `Купите ${item.name}. Подробности на сайте.` || 'undefined item description',
      alternates: { canonical: `https://maytry.ru/${link}` }
    }
  }

  if (link.includes('/faq') || CUSTOM_PAGES_LINKS.includes(link.replace('/', ''))) {
    const page = contentful.pages
      .find(page => page.link.link === link)
    
    return {
      h1: page?.metaH1 || 'undefined page',
      title: page?.metaTitle || 'undefined page title',
      description: page?.metaDescription || 'undefined page description',
      robots: { index: false }
    }
  }


  if (link === '/') {
    const site = contentful.sites[0]
    
    return {
      h1: site ? site.metaH1 : 'undefined site',
      title: site ? site.metaTitle : 'undefined site title',
      description: site ? site.metaDescription : 'undefined site description',
      alternates: { canonical: 'https://maytry.ru/' }
    }
  }

  if (link.includes('categoriya')) {
    const categoryLink = (link.split('categoriya/')[1])?.split('?')?.[0]
    const subcategoryLink = link.split('?')[1]
    const category = contentful.categorys.find(category => category.link === categoryLink)
    const subcategory = contentful.categorys.find(category => category.link === subcategoryLink)
    const currentCategory = subcategory || category

    if (!currentCategory) {
      return metadataFallback
    }

    // const canonicalOrNoIndex = subcategoryLink === undefined || subcategoryLink.length === 0 ?
    //   { alternates: { canonical: `https://maytry.ru/${link.replace('?', '/')}` } }
    //   :
    //   { robots: { index: false } }

    return {
      h1: currentCategory.metaH1,
      title: currentCategory.metaTitle,
      description: currentCategory.metaDescription,
      // ...canonicalOrNoIndex
      alternates: { canonical: `https://maytry.ru/${link}` }
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
  title: 'MAYTRY – 404 Страница не найдена',
  description: 'MAYTRY – 404 Страница не найдена'
}


const metadataVocabulary: { [key: string]: GetMetadataReturnType } = {
  '/login': {
    h1: 'Вход',
    title: 'maytry: вход',
    description: 'maytry вход',
    robots: { index: false }
  },
  '/register': {
    h1: 'Регистрация',
    title: 'maytry: регистрация',
    description: 'maytry регистрация',
    robots: { index: false }
  },
  '/account': {
    h1: 'Профиль',
    title: 'maytry: профиль',
    description: 'maytry профиль',
    robots: { index: false }
  },
  '/cart': {
    h1: 'корзина',
    title: 'maytry: корзина',
    description: 'maytry корзина',
    robots: { index: false }
  },
  '/checkout': {
    h1: 'заказ',
    title: 'maytry: заказ',
    description: 'maytry заказ',
    robots: { index: false }
  },
  '/success': {
    h1: 'успех',
    title: 'maytry: успех',
    description: 'maytry успех',
    robots: { index: false }
  },
  '/fail': {
    h1: 'неудача',
    title: 'maytry: неудача',
    description: 'maytry неудача',
    robots: { index: false }
  },
  '/admin': {
    h1: 'Админ',
    title: 'maytry: админка',
    description: 'maytry админка',
    robots: { index: false }
  },
}
