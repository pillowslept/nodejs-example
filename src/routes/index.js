import { Router } from 'express'
import { OK } from 'http-status'
import defaultRoutes from 'routes/default.route'
import { APP_WORKS } from 'constants/default.constant'

const router = Router()

// default health check
router.get('/health-check', (req, res) => res.status(OK).send(APP_WORKS))

// routes
router.use('/default', defaultRoutes)

export default router
