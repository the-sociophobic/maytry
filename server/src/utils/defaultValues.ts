import { ContentfulColorType, ContentfulSizeType } from 'types/contentful.type'


export const emptyContentfulItem = {
  id: '',
  link: '',
  name: '',
  description: '',
  categories: [],
  images: []
}

export const emptySize: ContentfulSizeType = {
  id: '0',
  name: '-',
}

export const emptyColor: ContentfulColorType = {
  id: '0',
  name: '',
  colorCode: '#FF0000'
}
