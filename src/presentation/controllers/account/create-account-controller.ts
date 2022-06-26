import { CreateAccount } from '@/domain/protocols/create-account'
import { AlreadyInUseError, MissingParamError } from '@/presentation/errors'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { badRequest, hasBeenCreated, serverError } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { EmailValidator } from '@/presentation/protocols/email-validator'

export class CreateAccountController implements Controller {
  constructor (private readonly emailValidator: EmailValidator,
    private readonly dbCreateAccount: CreateAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'password', 'email', 'driveLicense']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const { name, email, driveLicense, password } = httpRequest.body
      const isEmailValid = await this.emailValidator.validate(email)
      if (!isEmailValid) return badRequest(new InvalidParamError('email'))
      const isEmailAlreadyInUse = await this.dbCreateAccount.create({ name, email, driveLicense, password })
      if (isEmailAlreadyInUse) return badRequest(new AlreadyInUseError('email'))
      return hasBeenCreated()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
