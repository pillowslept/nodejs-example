import http from 'http'
import app from 'app'
import 'dotenv/config'
import simpleLogger from 'simple-node-logger'

const logger = simpleLogger.createSimpleLogger()
const port = process.env.PORT || '3000'

const server = http.createServer(app)

const error = (error) => {
  logger.info(`Error starting server using port: ${port}`)
  throw error
}

const listening = () => {
  logger.info(`App started at port: ${port}`)
}

server.listen(port)
server.on('error', error)
server.on('listening', listening)
