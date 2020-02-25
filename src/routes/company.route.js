import { Router } from 'express'
import * as companyController from 'controllers/company.controller'

const router = Router()

router.get('/', companyController.all)
router.get('/:id([0-9]+)', companyController.byId)
router.post('/', companyController.create)
router.put('/:id([0-9]+)', companyController.update)

export default router
