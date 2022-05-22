import { Specification } from '@/domain/models/specification'
import { AddSpecification, SpecificationParam } from '@/domain/protocols/add-specification'
import { MissingParamError } from '@/presentation/error'
import { badRequest, hasBeenCreated, serverError } from '@/presentation/helpers/http-helper'
import { AddSpecificationController } from '@/presentation/controllers/specifications/add-specification-controller'

const mockAddSpecificationStub = (): AddSpecification => {
  class AddSpecificationStub implements AddSpecification {
    async add (add: SpecificationParam): Promise<Specification | null> {
      return null
    }
  }
  return new AddSpecificationStub()
}

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
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      description: 'any_description'
    })
  })
  test('should return 403 if specification already in use', async () => {
    const { sut, addSpecificationStub } = makeSut()
    const addSpy = jest.spyOn(addSpecificationStub, 'add').mockResolvedValueOnce(Promise.resolve({ id: 'any_id', name: 'any_name', description: 'any_description', created_at: new Date() }))
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description'
      }
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      description: 'any_description'
    })
  })
  test('should return if AddSpecification throw', async () => {
    const { sut, addSpecificationStub } = makeSut()
    jest.spyOn(addSpecificationStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 201 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(hasBeenCreated())
  })
})
