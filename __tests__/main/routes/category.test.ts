import { CategoryMongo } from '@/infra/mongodb/schemas/category'
import { app } from '@/main/config/app'
import { connect, disconnect } from 'mongoose'
import request from 'supertest'
describe('Category Router', () => {
  beforeAll(async () => {
    await connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await CategoryMongo.deleteMany({})
    await disconnect()
  })
  test('Should return 201 on success', async () => {
    await request(app)
      .post('/api/categories')
      .send({ name: 'any_name', description: 'any_description' })
      .expect(201)
  })
  test('Should return 400 if category already exists', async () => {
    const newSpecification = new CategoryMongo({ name: 'any_name', description: 'any_description' })
    await newSpecification.save()
    await request(app)
      .post('/api/categories')
      .send({ name: 'any_name', description: 'any_description' })
      .expect(403)
  })
})
