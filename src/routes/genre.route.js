import { Router } from 'express'
import * as genreController from 'controllers/genre.controller'

const router = Router()

router.group('/', (router) => {
  router.get('', genreController.all)
  router.post('', genreController.create)

  router.route('/:id([0-9]+)')
    .get(genreController.byId)
    .put(genreController.update)
})

router.get('/report/:id([0-9]+)', genreController.report)

export default router
