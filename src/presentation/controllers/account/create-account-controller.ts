import { MissingParamError } from '@/presentation/error'
import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class CreateAccountController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'password', 'email', 'drive_license', 'avatar']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
    return badRequest(new MissingParamError('name'))
  }
}
