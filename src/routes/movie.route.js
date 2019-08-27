import { Router } from 'express'
import 'express-group-routes'
import * as movieController from 'controllers/movie.controller'
import * as genreController from 'controllers/genre.controller'

const router = Router()

router.get('/', movieController.all)
router.get('/:id([0-9]+)', movieController.byId)
router.post('/', movieController.create)
router.put('/:id([0-9]+)/watched', movieController.markAsWatched)
router.get('/seen', movieController.seen)
router.get('/to-watch', movieController.toWatch)
router.put('/:id([0-9]+)/genre', movieController.addGenres)

router.group('/genre', (router) => {
  router.get('/:id([0-9]+)', genreController.moviesByGenre)
})

export default router
