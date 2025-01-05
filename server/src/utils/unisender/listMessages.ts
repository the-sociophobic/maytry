import unisender_method from './unisender_method'


const listMessages = async (date_from: string, date_to: string) => {
  let res

  try {
    res = await unisender_method('listMessages', {
      date_from,
      date_to,
    })
  } catch (err) {
    throw err
  }

  return res
}


export default listMessages
