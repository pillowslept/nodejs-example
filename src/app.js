import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import api from 'routes'
import { OK } from 'http-status'
import 'dotenv/config'
import { errorsHandler } from 'middlewares/errors.middleware'

const prefix = process.env.PREFIX || '/api'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get(prefix, (req, res) => res.status(OK).send({ routes: listEndpoints(app) }))
app.use(prefix, api)
app.use(errorsHandler)

export default app
