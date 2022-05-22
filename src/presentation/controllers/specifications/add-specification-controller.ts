import { AddSpecification } from '@/domain/protocols/add-specification'
import { MissingParamError } from '@/presentation/error'
import { badRequest, hasBeenCreated } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddSpecificationController implements Controller {
  constructor (private readonly addSpecification: AddSpecification) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'description']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
    const { name, description } = httpRequest.body
    await this.addSpecification.add({ name, description })
    return hasBeenCreated()
  }
}
