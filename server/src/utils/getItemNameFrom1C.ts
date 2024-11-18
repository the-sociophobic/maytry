import { OneCItemType } from '../types/oneC.type'


export const getItemNameFrom1C = (item: OneCItemType) => {
  const number_of_spaces = (item.color.match(/ /g) || []).length + ((item.size + '').match(/ /g) || []).length + 2

  return item.name.split(' ').slice(0, -number_of_spaces).join(' ')
}

export const getItemNumberFrom1C = (item: OneCItemType) => {
  let item_number = ''

  item_number = item.name.match(/\d{5} ХУДИ, \d{2}/gm)?.[0]
  if (item_number)
    return item_number.replace('ХУДИ, ', '')

  item_number = item.name.match(/\d{5} Футболка, \d{2}/gm)?.[0]
  if (item_number)
    return item_number.replace('Футболка, ', '')

  item_number = item.name.match(/\d{5} Толстовка на молнии, \d{2}/gm)?.[0]
  if (item_number)
    return item_number.replace('Толстовка на молнии, ', '')

  item_number = item.article.match(/\d{5}/gm)?.[0]
  if (item_number)
    return item_number

  item_number = item.article.match(/\d{4}/gm)?.[0]
  if (item_number)
    return item_number

  return item.article
}

export const getInvertedName = (name: string) => {
  const parts = name.split(' ')

  return parts[1] + ' ' + parts[0]
}
