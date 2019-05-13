import bodyParser from 'body-parser'
import express from 'express'
import listEndpoints from 'express-list-endpoints'
import { NOT_FOUND } from 'http-status'
import api from 'routes'
import { OK } from 'http-status'
import 'dotenv/config';

const prefix = process.env.PREFIX || '/api'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Forwarded-For, Content-Type, Accept, Autorization, Country, user-id')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')

    next()
})

app.get(prefix, (req, res) => res.status(OK).send({ routes: listEndpoints(app) }))
app.use(prefix, api)

export default app
