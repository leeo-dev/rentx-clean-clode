import { DbAddSpecification } from '@/data/usecases/db-add-specification'
import { LoadSpecificationByNameRepository } from '@/data/protocols/load-specification-by-name-repository'
import { Specification } from '@/domain/models/specification'
import mockDate from 'mockdate'
import { mockSpecification } from '@/../__mocks__/mock-specification'

const mockLoadSpecificationByNameRepository = (): LoadSpecificationByNameRepository => {
  class LoadSpecificationByNameRepositoryStub implements LoadSpecificationByNameRepository {
    async loadByName (name: string): Promise<Specification | null> {
      return null
    }
  }

  return new LoadSpecificationByNameRepositoryStub()
}
type SutTypes = {
  sut: DbAddSpecification
  loadSpecificationByNameRepositoryStub: LoadSpecificationByNameRepository
}

const makeSut = (): SutTypes => {
  const loadSpecificationByNameRepositoryStub = mockLoadSpecificationByNameRepository()
  const sut = new DbAddSpecification(loadSpecificationByNameRepositoryStub)
  return { sut, loadSpecificationByNameRepositoryStub }
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
})
