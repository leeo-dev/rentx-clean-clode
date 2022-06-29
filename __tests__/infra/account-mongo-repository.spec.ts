import { AccountMongoRepository } from '@/infra/mongodb/account-mongo-repository'
import { mockAccountParam } from '@/../__mocks__/mock-account'
import { connect, disconnect } from 'mongoose'
import { AccountMongo } from '@/infra/mongodb/schemas/account'
describe('Account MongoRepository', () => {
  beforeAll(async () => {
    await connect(process.env.MONGO_URL ?? '')
  })
  afterAll(async () => {
    await disconnect()
  })
  beforeEach(async () => {
    await AccountMongo.deleteMany({})
  })
  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }
  test('should add a account on success', async () => {
    const sut = makeSut()
    await sut.create(mockAccountParam())
    const account = await AccountMongo.findOne({ name: 'any_name' })
    expect(account).toBeTruthy()
    expect(account).toHaveProperty('_id')
    expect(account?.admin).toBeFalsy()
  })
  test('should load an account on success ByEmail', async () => {
    const sut = makeSut()
    const newAccount = new AccountMongo(mockAccountParam())
    await newAccount.save()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account).toHaveProperty('id')
    expect(account?.admin).toBeFalsy()
    expect(account?.email).toEqual('any_email@mail.com')
  })
})
