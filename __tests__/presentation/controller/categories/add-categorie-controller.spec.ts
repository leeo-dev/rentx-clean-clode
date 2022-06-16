import { AddCategoryController } from '@/presentation/controllers/categories/add-category-controller'
import { MissingParamError } from '@/presentation/error'
import { badRequest } from '@/presentation/helpers/http-helper'

type SutTypes = {
  sut: AddCategoryController
}

const makeSut = (): SutTypes => {
  const sut = new AddCategoryController()
  return { sut }
}

describe('Add Category Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        description: 'any_description'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
})
