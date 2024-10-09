import 'dotenv/config'
import express, { Request, Responce } from 'express'
import cors from 'cors'
import { getProducts } from './routes/products'


const app = express()
app.use(cors())
app.use(express.json())

const { SERVER_PORT } = process.env


app.get('/products', async (request: Request, response: Responce) => {
  const products = await getProducts()

  response.send(products)
})


const init = () => {
  app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
}

init()