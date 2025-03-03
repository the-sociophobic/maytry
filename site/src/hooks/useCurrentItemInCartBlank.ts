import { CombinedItemType, ParsedColorType, ParsedSizeType } from '../types/contentful.type'
import { ItemInCartType } from '../types/site.type'
import parseColors from '../utils/parseColors'


const useCurrentItemInCartBlank = (
  item: CombinedItemType,
  quantity: number = 0,
  _currentSize?: ParsedSizeType,
  _currentColor?: ParsedColorType
) => {
  const colors = parseColors(item.color_price_size)
  const currentColor = _currentColor || colors.find(color => color.sizes.some(size => size.max_available > 0))
  const currentSizes = currentColor?.sizes || []
  const currentSize = _currentSize || currentSizes.find(size => size.max_available > 0)

  const currentItemInCartBlank: ItemInCartType = {
    ...item,
    ...(currentSize || {
      size: { id: '', name: '' },
      price: 0,
      max_available: 0,
    }),
    color: currentColor?.color,
    quantity,
    id: currentSize ? currentSize.id : '',
    item_number: ''
  }

  return currentItemInCartBlank
}


export default useCurrentItemInCartBlank
