import { Router } from 'express'
import 'express-group-routes'
import * as defaultController from 'controllers/default.controller'

const router = Router()

router.group('/hello', (router) => {
    router.get('/', defaultController.hello)
    router.get('/cheer', defaultController.cheer)
})

router.get('/', defaultController.def)

export default router