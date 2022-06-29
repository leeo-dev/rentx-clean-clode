import { AccountMongoRepository } from '@/infra/mongodb/account-mongo-repository'
import { mockAccountParam } from '@/../__mocks__/mock-account'
import { connect, disconnect } from 'mongoose'
import { AccountMongo } from '@/infra/mongodb/schemas/account'
describe('Specification MongoRepository', () => {
  beforeAll(async () => {
    await connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await AccountMongo.deleteMany({})
    await disconnect()
  })
  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }
  test('should add a account on success', async () => {
    const sut = makeSut()
    await sut.create(mockAccountParam())
    const account = await AccountMongo.findOne({ name: 'any_name' })
    console.log(account)
    expect(account).toBeTruthy()
    expect(account).toHaveProperty('_id')
    expect(account?.admin).toBeFalsy()
  })
})
