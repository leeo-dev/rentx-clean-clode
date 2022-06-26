import { DbCreateAccount } from '@/data/usecases/db-create-account'
import { mockLoadAccountByEmailRepository, mockAccountParam } from '@/../__mocks__/mock-account'
import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'

type SutTypes = {
  sut: DbCreateAccount
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new DbCreateAccount(loadAccountByEmailRepositoryStub)
  return { sut, loadAccountByEmailRepositoryStub }
}

describe('DbCreateAccount', () => {
  test('should call loadByEmail with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.create(mockAccountParam())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
