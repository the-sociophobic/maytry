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
    return item.defaultSalePrice
  if (item.color_price_size?.[0].salePrice !== undefined)
    return item.color_price_size?.[0].salePrice
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
  const priceString = price.toFixed(0) + ''
  const priceStringOffset = priceString.length % 3 - 1

  return [...priceString].map((char, charIndex) =>
    charIndex >= priceStringOffset && (charIndex - priceStringOffset) % 3 === 0 ?
      char + ' '
      :
      char
  ).join('') + ' RUB'
}

const getInterval = (item: CombinedItemType) => {
  if (!item.color_price_size)
    return [0, 0] as [number, number]

  const prices = item.color_price_size
    .map(c_p_s => c_p_s.price)
  const salePrice = getSalePrice(item)
  const pricesWithSalePrice = (salePrice ? [...prices, salePrice] : prices)
    .sort((a, b) => a - b)

  return [
    pricesWithSalePrice[0],
    pricesWithSalePrice[pricesWithSalePrice.length - 1]
  ] as [number, number]
}


export {
  getPrice,
  getSalePrice,
  getCurrentPrice,
  printPrice,
  getInterval
}
