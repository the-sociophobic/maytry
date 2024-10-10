import { ContentfulItemType } from './contentful.type'
import { OneCItemType } from './oneC.type'


export type CombinedItemType = ContentfulItemType & {
  oneC_item: OneCItemType
}
