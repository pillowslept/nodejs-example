import { Router } from 'express'
import * as companyController from 'controllers/company.controller'

const router = Router()

router.group('/', (router) => {
  router.get('', companyController.all)
  router.post('', companyController.create)

  router.route('/:id([0-9]+)')
    .get(companyController.byId)
    .put(companyController.update)
})

export default router
