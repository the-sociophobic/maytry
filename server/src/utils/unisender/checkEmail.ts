import unisender_method from './unisender_method'


const checkEmail = async (email_ids: number[]) => {
  let res

  try {
    res = await unisender_method('checkEmail', {
      email_id: email_ids.join(',')
    })
  } catch (err) {
    throw err
  }

  return res
}


export default checkEmail
