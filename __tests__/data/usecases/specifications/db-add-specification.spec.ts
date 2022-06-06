import { DbAddSpecification } from '@/data/usecases/db-add-specification'
import { LoadSpecificationByNameRepository } from '@/data/protocols/load-specification-by-name-repository'
import { Specification } from '@/domain/models/specification'
import mockDate from 'mockdate'
import { mockSpecification } from '@/../__mocks__/mock-specification'
import { SpecificationParam } from '@/domain/protocols/add-specification'
import { AddSpecificationRepository } from '@/data/protocols/add-specification-repository'

const mockLoadSpecificationByNameRepository = (): LoadSpecificationByNameRepository => {
  class LoadSpecificationByNameRepositoryStub implements LoadSpecificationByNameRepository {
    async loadByName (name: string): Promise<Specification | null> {
      return null
    }
  }

  return new LoadSpecificationByNameRepositoryStub()
}

const mockAddSpecificationRepositoryStub = (): AddSpecificationRepository => {
  class LoadSpecificationByNameRepositoryStub implements AddSpecificationRepository {
    async add (specificationParams: SpecificationParam): Promise<void> {
    }
  }

  return new LoadSpecificationByNameRepositoryStub()
}

type SutTypes = {
  sut: DbAddSpecification
  loadSpecificationByNameRepositoryStub: LoadSpecificationByNameRepository
  addSpecificationRepositoryStub: AddSpecificationRepository
}

const makeSut = (): SutTypes => {
  const loadSpecificationByNameRepositoryStub = mockLoadSpecificationByNameRepository()
  const addSpecificationRepositoryStub = mockAddSpecificationRepositoryStub()
  const sut = new DbAddSpecification(loadSpecificationByNameRepositoryStub, addSpecificationRepositoryStub)
  return { sut, loadSpecificationByNameRepositoryStub, addSpecificationRepositoryStub }
}

describe('DbAddSpecification UseCase', () => {
  beforeAll(async () => {
    mockDate.set(new Date())
  })
  afterAll(async () => {
    mockDate.reset()
  })
  test('Should call LoadSpecificationByNameRepository with correct name', async () => {
    const { sut, loadSpecificationByNameRepositoryStub } = makeSut()
    const loadByNameSpy = jest.spyOn(loadSpecificationByNameRepositoryStub, 'loadByName')
    await sut.add({ name: 'any_name', description: 'any_description' })
    expect(loadByNameSpy).toHaveBeenLastCalledWith('any_name')
  })
  test('Should return a specification if LoadSpecificationByNameRepository returns a specification', async () => {
    const { sut, loadSpecificationByNameRepositoryStub } = makeSut()
    jest.spyOn(loadSpecificationByNameRepositoryStub, 'loadByName').mockReturnValueOnce(Promise.resolve(mockSpecification()))
    const specification = await sut.add({ name: 'any_name', description: 'any_description' })
    expect(specification).toEqual(mockSpecification())
  })
  test('Should call AddSpecificationRepository with correct values', async () => {
    const { sut, addSpecificationRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSpecificationRepositoryStub, 'add')
    await sut.add({ name: 'any_name', description: 'any_description' })
    expect(addSpy).toHaveBeenLastCalledWith({ name: 'any_name', description: 'any_description' })
  })
})
