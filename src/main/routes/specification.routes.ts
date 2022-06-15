import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeSpecificationController } from '../factories/specification-controller-factory'

export default (router: Router): void => {
  router.post('/specifications', adaptRoute(makeSpecificationController()))
}
