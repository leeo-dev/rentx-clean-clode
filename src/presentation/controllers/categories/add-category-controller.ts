import { AddCategory } from '@/domain/protocols/add-category'
import { AlreadyInUseError, MissingParamError } from '@/presentation/error'
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class AddCategoryController implements Controller {
  constructor (private readonly addCategory: AddCategory) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'description']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const { name, description } = httpRequest.body
      const isCategoryAlreadyExists = await this.addCategory.add({ name, description })
      if (isCategoryAlreadyExists) return forbidden(new AlreadyInUseError('Category'))
      return {
        statusCode: 200,
        body: null
      }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
