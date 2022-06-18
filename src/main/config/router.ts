
import { Express, Router } from 'express'
export default async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api', router)
  const specificationRouter = await import('../routes/categories.routes')
  const categoryRouter = await import('../routes/specification.routes')
  specificationRouter.default(router)
  categoryRouter.default(router)
}
