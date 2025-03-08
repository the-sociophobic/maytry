import { Request, Response } from 'express'

import useCombinedData from '../hooks/useCombinedData'
import storage from '../units/storage'


const UpdateData = async (request: Request, response: Response) => {
  await storage.delete('combined.json')
  await storage.delete('contentful.json')
  await storage.delete('1C.json')
  setTimeout(async () => {
    await useCombinedData()

    response.send(true)
  }, 150)
}


export default UpdateData
