import { Request, Response } from 'express'

import useCombinedData from '../hooks/useCombinedData'


const Data = async (request: Request, response: Response) => {
  response.send(await useCombinedData())
}


export default Data
