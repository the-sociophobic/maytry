import axios from 'axios'
import encodeParams from '../encodeParams'


const { UNISENDER_API } = process.env


const unisender_method = async (method_name: string, params: { [key: string]: string | number }) => {
  let res

  console.log({
    format: 'json',
    api_key: UNISENDER_API,
    ...params
  })

  try {
    res = (await axios.get(
      `https://api.unisender.com/ru/api/${method_name}?${encodeParams({
        format: 'json',
        api_key: UNISENDER_API,
        ...params
      })}`
    )).data
  } catch (err) {
    throw err
  }

  return res
}

export default unisender_method
