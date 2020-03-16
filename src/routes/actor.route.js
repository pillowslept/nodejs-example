import { Router } from 'express'
import 'express-group-routes'
import * as actorController from 'controllers/actor.controller'

const router = Router()

router.group('/', (router) => {
  router.get('', actorController.all)
  router.post('', actorController.create)

  router.route('/:id([0-9]+)')
    .get(actorController.byId)
    .put(actorController.update)
})

router.get('/movie/:id([0-9]+)', actorController.byMovie)

export default router
