import { Request, Response } from 'express'

import useCombinedData from '../hooks/useCombinedData'
import storage from '../units/storage'


const UpdateData = async (request: Request, response: Response) => {
  const { IS_PROD } = process.env

  if (IS_PROD !== 'false')
    await storage.delete('1C.json')
  
  await storage.delete('combined.json')
  await storage.delete('contentful.json')
  setTimeout(async () => {
    await useCombinedData()

    response.send(true)
  }, 150)
}


export default UpdateData
