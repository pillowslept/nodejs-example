import { Router } from 'express'
import * as genreController from 'controllers/genre.controller'

const router = Router()

router.get('/', genreController.all)
router.get('/:id([0-9]+)', genreController.byId)
router.post('/', genreController.create)

export default router
