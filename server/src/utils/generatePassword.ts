import generateHash from './generateHash'


const generatePassword = (email: string) => {
  return generateHash(email + Math.random(), 5) + ''
}


export default generatePassword
