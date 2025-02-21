import generateHash from './generateHash'


const generateToken = (email: string) => {
  return generateHash(email + Math.random(), 7) + ''
}


export default generateToken
