import { MissingParamError } from '@/presentation/error'
import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddSpecificationController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    return badRequest(new MissingParamError('name'))
  }
}
