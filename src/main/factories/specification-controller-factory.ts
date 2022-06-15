import { DbAddSpecification } from '@/data/usecases/db-add-specification'
import { SpecificationMongoDb } from '@/infra/mongodb/specification-mongodb'
import { AddSpecificationController } from '@/presentation/controllers/specifications/add-specification-controller'
import { Controller } from '@/presentation/protocols/controller'
export const makeSpecificationController = (): Controller => {
  const specificationMongoDb = new SpecificationMongoDb()
  const addSpecification = new DbAddSpecification(specificationMongoDb, specificationMongoDb)
  return new AddSpecificationController(addSpecification)
}
