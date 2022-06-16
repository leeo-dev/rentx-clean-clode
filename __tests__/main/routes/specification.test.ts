import { SpecificationMongo } from '@/infra/mongodb/schemas/specification'
import { app } from '@/main/config/app'
import { connect, disconnect } from 'mongoose'
import request from 'supertest'
describe('Specification Router', () => {
  beforeAll(async () => {
    await connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await SpecificationMongo.deleteMany({})
    await disconnect()
  })
  test('Should return 201 on success', async () => {
    await request(app)
      .post('/api/specifications')
      .send({ name: 'any_name', description: 'any_description' })
      .expect(201)
  })
  test('Should return 400 if specification already exists', async () => {
    const newSpecification = new SpecificationMongo({ name: 'any_name', description: 'any_description' })
    await newSpecification.save()
    await request(app)
      .post('/api/specifications')
      .send({ name: 'any_name', description: 'any_description' })
      .expect(403)
  })
})
