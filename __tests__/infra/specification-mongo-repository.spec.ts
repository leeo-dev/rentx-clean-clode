import { connect, disconnect } from 'mongoose'
import { SpecificationMongoDb } from '@/infra/mongodb/specification-mongodb'
import { SpecificationMongo } from '@/infra/mongodb/schemas/specification'
describe('Specification MongoRepository', () => {
  beforeAll(async () => {
    await connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await SpecificationMongo.deleteMany({})
    await disconnect()
  })
  const makeSut = (): SpecificationMongoDb => {
    return new SpecificationMongoDb()
  }
  test('should add a specification on success', async () => {
    const sut = makeSut()
    await sut.add({ name: 'any_name', description: 'any_description' })
    const spec = await SpecificationMongo.findOne({ name: 'any_name' })
    expect(spec).toBeTruthy()
    expect(spec).toHaveProperty('_id')
  })
  test('should load a specification on success', async () => {
    const sut = makeSut()
    const specification = new SpecificationMongo({ name: 'any_name', description: 'any_description' })
    await specification.save()
    const specificationResult = await sut.loadByName('any_name')
    expect(specificationResult).toBeTruthy()
    expect(specificationResult).toHaveProperty('name')
  })
})
