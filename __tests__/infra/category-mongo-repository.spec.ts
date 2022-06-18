import { CategoryMongoDb } from './../../src/infra/mongodb/category-mongodb'
import { CategoryMongo } from '@/infra/mongodb/schemas/category'
import { connect, disconnect } from 'mongoose'
describe('Category MongoRepository', () => {
  beforeAll(async () => {
    await connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await CategoryMongo.deleteMany({})
    await disconnect()
  })
  const makeSut = (): CategoryMongoDb => {
    return new CategoryMongoDb()
  }
  test('should add a category on success', async () => {
    const sut = makeSut()
    await sut.add({ name: 'any_name', description: 'any_description' })
    const spec = await CategoryMongo.findOne({ name: 'any_name' })
    expect(spec).toBeTruthy()
    expect(spec).toHaveProperty('_id')
  })

  test('should load a category on success', async () => {
    const sut = makeSut()
    const category = new CategoryMongo({ name: 'any_name', description: 'any_description' })
    await category.save()
    const categoryResult = await sut.loadByName('any_name')
    expect(categoryResult).toBeTruthy()
    expect(categoryResult).toHaveProperty('name')
  })
})
