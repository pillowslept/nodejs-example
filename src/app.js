import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { NOT_FOUND } from 'http-status'
import listEndpoints from 'express-list-endpoints'
import api from 'routes'
import { OK } from 'http-status'
import 'dotenv/config'
import { errorsHandler } from 'middlewares/errors.middleware'
import { ApiException } from 'utils/errors.exceptions'

const prefix = process.env.PREFIX || '/api'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get(prefix, (req, res) => res.status(OK).send({ routes: listEndpoints(app) }))
app.use(prefix, api)
app.use((req, res, next) => next(new ApiException('Api route not found', NOT_FOUND)))
app.use(errorsHandler)

export default app
