import { Router } from 'express'
import * as movieController from 'controllers/movie.controller'

const router = Router()

router.get('/seen', movieController.seen)
router.get('/to-watch', movieController.toWatch)

export default router
