import { AccountMongo } from '@/infra/mongodb/schemas/account'
import { app } from '@/main/config/app'
import { connect, disconnect } from 'mongoose'
import request from 'supertest'
import { mockAccountParam } from '@/../__mocks__/mock-account'
describe('Specification Router', () => {
  beforeAll(async () => {
    await connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await AccountMongo.deleteMany({})
    await disconnect()
  })
  test('Should return 201 on success', async () => {
    await request(app)
      .post('/api/account')
      .send(mockAccountParam())
      .expect(201)
  })
  test('Should return 400 if specification already exists', async () => {
    const newSpecification = new AccountMongo(mockAccountParam())
    try {
      await newSpecification.save()
    } catch (error) {

    }
    await request(app)
      .post('/api/account')
      .send(mockAccountParam())
      .expect(400)
  })
})
