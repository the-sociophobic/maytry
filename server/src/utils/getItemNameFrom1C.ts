import { OneCItemType } from '../types/oneC.type'


export const getItemNameFrom1C = (item: OneCItemType) => {
  const number_of_spaces = (item.color.match(/ /g) || []).length + ((item.size + '').match(/ /g) || []).length + 2

  return item.name.split(' ').slice(0, -number_of_spaces).join(' ')
}

export const getItemNumberFrom1C = (item: OneCItemType) => {
  return item.name.split(' ')[0]
}

export const getInvertedName = (name: string) => {
  const parts = name.split(' ')

  return parts[1] + ' ' + parts[0]
}
