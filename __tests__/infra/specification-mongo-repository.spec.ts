import { connect, disconnect } from 'mongoose'
import { Specification } from '@/infra/mongodb/schemas/specification'
describe('Specification MongoRepository', () => {
  beforeAll(async () => {
    await connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await disconnect()
  })
  test('should add an specification on success', async () => {
    const specification = new Specification({ name: 'any_name', description: 'any_description' })
    await specification.save()
    const spec = await Specification.findOne({ name: 'any_name' })
    expect(spec).toBeTruthy()
    expect(spec).toHaveProperty('_id')
  })
})
