import express, { Request, Responce } from 'express'
import axios from 'axios'
import cors from 'cors'
import 'dotenv/config'

import useCombinedData from './hooks/useCombinedData'
import storage from './utils/storage'



const app = express()
app.use(cors())
app.use(express.json())

const { SERVER_PORT } = process.env


app.get('/data', async (request: Request, response: Responce) => {
  response.send(await useCombinedData())
})

app.get('/update-data', async (request: Request, response: Responce) => {
  storage.delete('contentful.json')
  // storage.delete('1C.json')
  setTimeout(async () => {
    await useCombinedData()

    response.send(true)
  }, 150)
})

app.post('/post-boxberry', async (request, response) => {
  const { body } = request
  const res = (await axios.post(
    'https://api.boxberry.ru/json.php',
    body
  )).data

  response.send(res)
})


const init = () => {
  app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
}

init()