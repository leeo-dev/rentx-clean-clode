import { mockError } from '@/../__mocks__/mockError'
import { mockAddCategory, mockCategory, httpCategoryRequest } from '@/../__mocks__/mock-categories'
import { AddCategory } from '@/domain/protocols/add-category'
import { AddCategoryController } from '@/presentation/controllers/categories/add-category-controller'
import { AlreadyInUseError, MissingParamError } from '@/presentation/errors'
import { badRequest, forbidden, hasBeenCreated, serverError } from '@/presentation/helpers/http-helper'

type SutTypes = {
  sut: AddCategoryController
  addCategoryStub: AddCategory
}

const makeSut = (): SutTypes => {
  const addCategoryStub = mockAddCategory()
  const sut = new AddCategoryController(addCategoryStub)
  return { sut, addCategoryStub }
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
  test('should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('description')))
  })
  test('should call AddCategory with correct values', async () => {
    const { sut, addCategoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryStub, 'add')
    await sut.handle(httpCategoryRequest())
    expect(addSpy).toHaveBeenCalledWith(httpCategoryRequest().body)
  })
  test('should return 500 if AddCategory throw', async () => {
    const { sut, addCategoryStub } = makeSut()
    jest.spyOn(addCategoryStub, 'add').mockImplementationOnce(mockError)
    const httpResponse = await sut.handle(httpCategoryRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 403 is category is already in use', async () => {
    const { sut, addCategoryStub } = makeSut()
    jest.spyOn(addCategoryStub, 'add').mockReturnValueOnce(Promise.resolve(mockCategory()))
    const httpResponse = await sut.handle(httpCategoryRequest())
    expect(httpResponse).toEqual(forbidden(new AlreadyInUseError('Category')))
  })
  test('should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpCategoryRequest())
    expect(httpResponse).toEqual(hasBeenCreated())
  })
})
