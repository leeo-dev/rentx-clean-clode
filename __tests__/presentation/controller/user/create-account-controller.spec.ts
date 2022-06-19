import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { CreateAccountController } from '@/presentation/controllers/account/create-account-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'
import { EmailValidator } from '@/presentation/protocols/email-validator'

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    async validate (email: string): Promise<Boolean> {
      return true
    }
  }
  return new EmailValidatorStub()
}

type SutTypes = {
  sut: CreateAccountController
  emailValidatorAdapterStub: EmailValidator
}
const makeSut = (): SutTypes => {
  const emailValidatorAdapterStub = mockEmailValidator()
  const sut = new CreateAccountController(emailValidatorAdapterStub)
  return { sut, emailValidatorAdapterStub }
}
describe('Create Account Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password',
        email: 'any_email',
        drive_license: 'any_drive_license'
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
        drive_license: 'any_drive_license'
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
        drive_license: 'any_drive_license'
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
    expect(httpResponse).toEqual(badRequest(new MissingParamError('drive_license')))
  })
  test('should call EmailValidatorAdapter with correct email', async () => {
    const { sut, emailValidatorAdapterStub } = makeSut()
    const validateSpy = jest.spyOn(emailValidatorAdapterStub, 'validate')
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        email: 'any_email@mail.com',
        drive_license: 'any_drive_license'
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
        drive_license: 'any_drive_license'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
})
