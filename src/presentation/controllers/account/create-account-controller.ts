import { MissingParamError } from '@/presentation/errors'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { EmailValidator } from '@/presentation/protocols/email-validator'

export class CreateAccountController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'password', 'email', 'drive_license']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
    const { email } = httpRequest.body
    const isEmailValid = await this.emailValidator.validate(email)
    if (!isEmailValid) return badRequest(new InvalidParamError('email'))
    return badRequest(new MissingParamError('name'))
  }
}
