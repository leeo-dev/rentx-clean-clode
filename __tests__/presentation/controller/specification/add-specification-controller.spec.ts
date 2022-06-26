import { AddSpecification } from '@/domain/protocols/add-specification'
import { AlreadyInUseError, MissingParamError } from '@/presentation/errors'
import { badRequest, hasBeenCreated, serverError, forbidden } from '@/presentation/helpers/http-helper'
import { AddSpecificationController } from '@/presentation/controllers/specifications/add-specification-controller'
import { httpSpecificationRequest, mockAddSpecificationStub, mockSpecification } from '@/../__mocks__/mock-specification'
import { mockError } from '@/../__mocks__/mockError'

const makeSut = (): SutTypes => {
  const addSpecificationStub = mockAddSpecificationStub()
  const sut = new AddSpecificationController(addSpecificationStub)
  return { sut, addSpecificationStub }
}

type SutTypes = {
  sut: AddSpecificationController
  addSpecificationStub: AddSpecification
}

describe('Add Specification Controller', () => {
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
  test('should calls AddSpecification UseCase with correct values', async () => {
    const { sut, addSpecificationStub } = makeSut()
    const addSpy = jest.spyOn(addSpecificationStub, 'add')
    await sut.handle(httpSpecificationRequest())
    expect(addSpy).toHaveBeenCalledWith(httpSpecificationRequest().body)
  })
  test('should return 403 if specification already in use', async () => {
    const { sut, addSpecificationStub } = makeSut()
    jest.spyOn(addSpecificationStub, 'add').mockResolvedValueOnce(Promise.resolve(mockSpecification()))
    const httpResponse = await sut.handle(httpSpecificationRequest())
    expect(httpResponse).toEqual(forbidden(new AlreadyInUseError('specification')))
  })
  test('should return if AddSpecification throw', async () => {
    const { sut, addSpecificationStub } = makeSut()
    jest.spyOn(addSpecificationStub, 'add').mockImplementationOnce(mockError)
    const httpResponse = await sut.handle(httpSpecificationRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpSpecificationRequest())
    expect(httpResponse).toEqual(hasBeenCreated())
  })
})
