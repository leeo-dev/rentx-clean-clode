import { CreateAccountController } from '@/presentation/controllers/account/create-account-controller'
import { AlreadyInUseError, MissingParamError, InvalidParamError } from '@/presentation/errors'
import { badRequest, serverError, hasBeenCreated } from '@/presentation/helpers/http-helper'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { DbCreateAccount } from '@/domain/protocols/create-account'
import { mockAccount, mockDbCreateAccount, mockEmailValidator, mockHttpRequestAccount } from '@/../__mocks__/mock-account'
import { mockError } from '@/../__mocks__/mockError'

type SutTypes = {
  sut: CreateAccountController
  emailValidatorAdapterStub: EmailValidator
  dbCreateAccountStub: DbCreateAccount
}
const makeSut = (): SutTypes => {
  const emailValidatorAdapterStub = mockEmailValidator()
  const dbCreateAccountStub = mockDbCreateAccount()
  const sut = new CreateAccountController(emailValidatorAdapterStub, dbCreateAccountStub)
  return { sut, emailValidatorAdapterStub, dbCreateAccountStub }
}
describe('Create Account Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password',
        email: 'any_email',
        driveLicense: 'any_driveLicense'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        driveLicense: 'any_driveLicense'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        driveLicense: 'any_driveLicense'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  test('should return 400 if no drive license is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'any_email'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('driveLicense')))
  })
  test('should call EmailValidatorAdapter with correct email', async () => {
    const { sut, emailValidatorAdapterStub } = makeSut()
    const validateSpy = jest.spyOn(emailValidatorAdapterStub, 'validate')
    await sut.handle(mockHttpRequestAccount())
    expect(validateSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorAdapterStub } = makeSut()
    jest.spyOn(emailValidatorAdapterStub, 'validate').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockHttpRequestAccount())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorAdapterStub } = makeSut()
    jest.spyOn(emailValidatorAdapterStub, 'validate').mockImplementationOnce(mockError)
    const httpResponse = await sut.handle(mockHttpRequestAccount())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should call DbCreateAccount with correct values', async () => {
    const { sut, dbCreateAccountStub } = makeSut()
    const createSpy = jest.spyOn(dbCreateAccountStub, 'create')
    await sut.handle(mockHttpRequestAccount())
    expect(createSpy).toHaveBeenCalledWith(mockHttpRequestAccount().body)
  })
  test('should return 400 if DbCreateAccount returns an account in use', async () => {
    const { sut, dbCreateAccountStub } = makeSut()
    jest.spyOn(dbCreateAccountStub, 'create').mockReturnValueOnce(Promise.resolve(mockAccount()))
    const httpResponse = await sut.handle(mockHttpRequestAccount())
    expect(httpResponse).toEqual(badRequest(new AlreadyInUseError('email')))
  })
  test('should return 500 if DbCreateAccount throws', async () => {
    const { sut, dbCreateAccountStub } = makeSut()
    jest.spyOn(dbCreateAccountStub, 'create').mockImplementationOnce(mockError)
    const httpResponse = await sut.handle(mockHttpRequestAccount())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockHttpRequestAccount())
    expect(httpResponse).toEqual(hasBeenCreated())
  })
})
