import { CombinedItemType } from '../types/contentful.type'


const getPrice = (item: CombinedItemType) => {
  if (item.defaultPrice !== undefined)
    return item.defaultPrice
  if (item.color_price_size?.[0].price !== undefined)
    return item.color_price_size?.[0].price
  return -1
}

const getSalePrice = (item: CombinedItemType) => {
  if (item.defaultSalePrice !== undefined)
    return item.defaultPrice
  if (item.color_price_size?.[0].salePrice !== undefined)
    return item.color_price_size?.[0].price
  return undefined
}

const getCurrentPrice = (item: CombinedItemType) => {
  const salePrice = getSalePrice(item)
  const price = getPrice(item)

  if (salePrice !== undefined)
    return salePrice
  return price
}

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
