import axios from 'axios'
import encodeParams from '../encodeParams'


const { UNISENDER_API } = process.env


const getLists = async () => {
  let res

  try {
    res = (await axios.get(
      'https://api.unisender.com/ru/api/getLists?' + encodeParams({
        format: 'json',
        api_key: UNISENDER_API
      })
    )).data
  } catch (err) {
    console.log(err)
  }

  return res
}


export default getLists
