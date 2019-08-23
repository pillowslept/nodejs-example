import { Router } from 'express'
import { OK } from 'http-status'
import defaultRoutes from 'routes/default.route'
import movieRoutes from 'routes/movie.route'
import genreRoutes from 'routes/genre.route'
import { APP_WORKS } from 'constants/messages.constant'

const router = Router()

// default health check
router.get('/health-check', (req, res) => res.status(OK).send(APP_WORKS))

// routes
router.use('/default', defaultRoutes)

router.use('/movie', movieRoutes)
router.use('/genre', genreRoutes)

export default router
