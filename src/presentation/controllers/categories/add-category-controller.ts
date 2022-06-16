import { AddCategory } from '@/domain/protocols/add-category'
import { MissingParamError } from '@/presentation/error'
import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class AddCategoryController implements Controller {
  constructor (private readonly addCategory: AddCategory) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'description']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
    }
    const { name, description } = httpRequest.body
    await this.addCategory.add({ name, description })
    return {
      statusCode: 200,
      body: null
    }
  }
}
