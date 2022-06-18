import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeCategoryController } from '../factories/category-controller-factory'

export default (router: Router): void => {
  router.post('/categories', adaptRoute(makeCategoryController()))
}
