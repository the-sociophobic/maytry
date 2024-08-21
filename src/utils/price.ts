import { ItemType } from '../hooks/useContentful/types'


const getPrice = (item: ItemType) =>
  item.defaultPrice || item.color_price_size?.[0].price || undefined

const getSalePrice = (item: ItemType) =>
  item.defaultSalePrice || item.color_price_size?.[0].salePrice || undefined

const getCurrentPrice = (item: ItemType) =>
  getSalePrice(item) || getPrice(item) || 10000

const printPrice = (price: number) => {
  const priceString = price + ''
  const priceStringOffset = priceString.length % 3 - 1

  return [...priceString].map((char, charIndex) =>
    charIndex >= priceStringOffset && (charIndex - priceStringOffset) % 3 === 0 ?
      char + ' '
      :
      char
  ).join('') + ' RUB'
}


export {
  getPrice,
  getSalePrice,
  getCurrentPrice,
  printPrice
}
