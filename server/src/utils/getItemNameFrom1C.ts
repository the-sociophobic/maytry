import { OneCItemType } from '../types/oneC.type'


const getItemNameFrom1C = (item: OneCItemType) => {
  const number_of_spaces = (item.color.match(/ /g) || []).length + ((item.size + '').match(/ /g) || []).length + 2

  return item.name.split(' ').slice(0, -number_of_spaces).join(' ')
}


export default getItemNameFrom1C
