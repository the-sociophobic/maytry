import { Request, Response } from 'express'

import useCombinedData from '../hooks/useCombinedData'
import storage from '../units/storage'


const UpdateCombinedData = async (request: Request, response: Response) => {
  await storage.delete('combined.json')
  setTimeout(async () => {
    await useCombinedData()

    response.send(true)
  }, 150)
}


export default UpdateCombinedData
