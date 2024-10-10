import express, { Request, Responce } from 'express'
import cors from 'cors'
import 'dotenv/config'

import useCombinedData from './hooks/useCombinedData'



const app = express()
app.use(cors())
app.use(express.json())

const { SERVER_PORT } = process.env


app.get('/data', async (request: Request, response: Responce) => {
  response.send(await useCombinedData())
})


const init = () => {
  app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
}

init()