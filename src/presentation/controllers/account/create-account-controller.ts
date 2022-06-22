import { DbCreateAccount } from '@/domain/protocols/create-account'
import { MissingParamError } from '@/presentation/errors'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { EmailValidator } from '@/presentation/protocols/email-validator'

export class CreateAccountController implements Controller {
  constructor (private readonly emailValidator: EmailValidator,
    private readonly dbCreateAccount: DbCreateAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'password', 'email', 'driveLicense']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
    const { name, email, driveLicense, password } = httpRequest.body
    const isEmailValid = await this.emailValidator.validate(email)
    if (!isEmailValid) return badRequest(new InvalidParamError('email'))
    await this.dbCreateAccount.create({ name, email, driveLicense, password })
    return badRequest(new MissingParamError('name'))
  }
}
