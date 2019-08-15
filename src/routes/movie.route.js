import { Router } from 'express'
import * as movieController from 'controllers/movie.controller'

const router = Router()

router.get('/', movieController.all)
router.get('/:id([0-9]+)', movieController.byId)
router.post('/', movieController.create)
router.put('/:id([0-9]+)/watched', movieController.markAsWatched)
router.get('/seen', movieController.seen)
router.get('/to-watch', movieController.toWatch)

export default router
