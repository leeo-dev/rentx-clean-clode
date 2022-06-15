
import { Express, Router } from 'express'
export default async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api', router)
  const specificationUpRouter = await import('../routes/specification.routes')
  specificationUpRouter.default(router)
}
