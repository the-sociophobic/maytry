import { getContentfulDataWithoutBadItems } from '../hooks/useContentful'


export type MetadataType = {
  h1?: string
  title?: string
  description?: string
}


const getMetadataFromContentful = async (link: string): Promise<MetadataType> => {
  const contentful = await getContentfulDataWithoutBadItems()

  if (!contentful)
    return metadataFallback

  if (link.includes('/product/')) {
    const productId = link.replace('/product/', '')
    const item = contentful.items.find(item => item.link === productId)
    
    return {
      h1: item?.metaH1 || 'undefined item',
      title: item?.metaTitle || 'undefined item title',
      description: item?.metaDescription || 'undefined item description',
    }
  }

  if (link.includes('/page/')) {
    const pageId = link.replace('/page/', '')
    const page = contentful.pages.find(page => page.link.link === pageId)
    
    return {
      h1: page?.metaH1 || 'undefined page',
      title: page?.metaTitle || 'undefined page title',
      description: page?.metaDescription || 'undefined page description',
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

  const hardcodedPage = metadataVocabulary[link]

  if (hardcodedPage)
    return hardcodedPage

  return metadataFallback
}


export default getMetadataFromContentful


const metadataFallback: MetadataType = {
  h1: 'maytry h1',
  title: 'maytry: ',
  description: 'maytry page description'
}


const metadataVocabulary: { [key: string]: MetadataType } = {
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
