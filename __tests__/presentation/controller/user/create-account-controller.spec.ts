import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { CreateAccountController } from '@/presentation/controllers/account/create-account-controller'
import { AlreadyInUseError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { AccountParam, DbCreateAccount } from '@/domain/protocols/create-account'
import { Account } from '@/domain/models/account'
import { mockAccount } from '@/../__mocks__/mock-account'

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    async validate (email: string): Promise<Boolean> {
      return true
    }
  }
  return new EmailValidatorStub()
}

const mockDbCreateAccount = (): DbCreateAccount => {
  class DbCreateAccountStub implements DbCreateAccount {
    async create (accountParam: AccountParam): Promise<Account | null> {
      return null
    }
  }
  return new DbCreateAccountStub()
}

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
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'any_email@mail.com',
        driveLicense: 'any_driveLicense'
      }
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorAdapterStub } = makeSut()
    jest.spyOn(emailValidatorAdapterStub, 'validate').mockReturnValueOnce(Promise.resolve(false))
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'invalid_email@mail.com',
        driveLicense: 'any_driveLicense'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorAdapterStub } = makeSut()
    jest.spyOn(emailValidatorAdapterStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'any_email@mail.com',
        driveLicense: 'any_driveLicense'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should call DbCreateAccount with correct values', async () => {
    const { sut, dbCreateAccountStub } = makeSut()
    const createSpy = jest.spyOn(dbCreateAccountStub, 'create')
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'any_email@mail.com',
        driveLicense: 'any_driveLicense'
      }
    }
    await sut.handle(httpRequest)
    expect(createSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('should return 400 if DbCreateAccount returns an account in use', async () => {
    const { sut, dbCreateAccountStub } = makeSut()
    jest.spyOn(dbCreateAccountStub, 'create').mockReturnValueOnce(Promise.resolve(mockAccount()))
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'any_email@mail.com',
        driveLicense: 'any_driveLicense'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new AlreadyInUseError('email')))
  })
  test('should return 500 if DbCreateAccount throws', async () => {
    const { sut, dbCreateAccountStub } = makeSut()
    jest.spyOn(dbCreateAccountStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'any_email@mail.com',
        driveLicense: 'any_driveLicense'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
