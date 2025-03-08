import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import routes from './routes'


const app = express()


class server {

  static create = () => {
    app.use(cors())
    app.use(express.json())
  }

  static setRoutes = () => {
    routes.forEach(route => {
      switch (route.type) {
        case 'GET':
          app.get(route.path, route.fn)
          break
        case 'POST':
          app.post(route.path, route.fn)
          break
      }
    })
  }
  
  static start = () => {
    const { SERVER_PORT } = process.env

    app.listen(
      SERVER_PORT,
      () => console.log(`Running on port ${SERVER_PORT}`)
    )
  }

}


export default server
