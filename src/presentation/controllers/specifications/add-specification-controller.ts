import { AddSpecification } from '@/domain/protocols/add-specification'
import { AlreadyInUseError, MissingParamError } from '@/presentation/error'
import { badRequest, hasBeenCreated, serverError, forbidden } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddSpecificationController implements Controller {
  constructor (private readonly addSpecification: AddSpecification) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'description']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const { name, description } = httpRequest.body
      const alreadyExists = await this.addSpecification.add({ name, description })
      if (alreadyExists) return forbidden(new AlreadyInUseError('specification'))
      return hasBeenCreated()
    } catch (error) {
      return serverError(error)
    }
  }
}
