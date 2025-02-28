import { CombinedItemType, ContentfulPromocodeType } from '../types/contentful.type'
import { ItemInCartType } from '../types/site.type'


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

const calculateItemSubtotalPrice = (item: ItemInCartType) =>
  (item.salePrice || item.price) * item.quantity

const calculateItemSubtotalPriceWithPromocode = (
  item: ItemInCartType,
  promocode: ContentfulPromocodeType
) => {
  const itemInCartInPromocode = promocode.items!
    .find(promocodeItem => promocodeItem.link === item.link)
  const itemInCartIsOnSale = !!itemInCartInPromocode
  const itemInCartPrice = calculateItemSubtotalPrice(item)
  const itemInCartSalePrice = itemInCartIsOnSale ?
    calculatePromocodePrice(itemInCartPrice, promocode)
    :
    itemInCartPrice

  return itemInCartSalePrice
}

const calculateItemsPrice = (items: ItemInCartType[]) =>
  items
    .map(item => calculateItemSubtotalPrice(item))
    .reduce((a, b) => a + b, 0)

const calculatePromocodePrice = (price: number, promocode: ContentfulPromocodeType) => {
  let calculatedPrice = price

  if (promocode.p_type) {
    calculatedPrice *= (1 - (promocode.amount / 100))
  } else {
    calculatedPrice -= promocode.amount
  }

  return calculatedPrice
}


export {
  getPrice,
  getSalePrice,
  getCurrentPrice,
  printPrice,
  getInterval,
  calculateItemSubtotalPrice,
  calculateItemSubtotalPriceWithPromocode,
  calculateItemsPrice,
  calculatePromocodePrice
}
