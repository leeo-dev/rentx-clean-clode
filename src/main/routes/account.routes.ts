import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAccountController } from '../factories/account-controller-factory'

export default (router: Router): void => {
  router.post('/account', adaptRoute(makeAccountController()))
}
