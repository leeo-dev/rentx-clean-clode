import { DbCreateAccount } from '@/data/usecases/db-create-account'
import { mockLoadAccountByEmailRepository, mockAccountParam, mockAccount, mockCreateAccountRepository } from '@/../__mocks__/mock-account'
import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'
import { CreateAccountRepository } from '@/data/protocols/create-account-repository'

type SutTypes = {
  sut: DbCreateAccount
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  createAccountRepositoryStub: CreateAccountRepository
}

const makeSut = (): SutTypes => {
  const createAccountRepositoryStub = mockCreateAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new DbCreateAccount(loadAccountByEmailRepositoryStub, createAccountRepositoryStub)
  return { sut, loadAccountByEmailRepositoryStub, createAccountRepositoryStub }
}

describe('DbCreateAccount', () => {
  test('should call loadByEmail with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.create(mockAccountParam())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('should return an account if loadByEmail returns an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccount()))
    const isAccountInUse = await sut.create(mockAccountParam())
    expect(isAccountInUse).toEqual(mockAccount())
  })
  test('should call CreateAccountRepository with correct values', async () => {
    const { sut, createAccountRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createAccountRepositoryStub, 'create')
    await sut.create(mockAccountParam())
    expect(createSpy).toHaveBeenCalledWith(mockAccountParam())
  })
})
