import { app } from '../config/app'
import request from 'supertest'
describe('Specification Router', () => {
  test('Should return 201 on success', async () => {
    await request(app)
      .post('/api/specifications')
      .send({ name: 'any_name', description: 'any_description' })
      .expect(201)
  })
})
