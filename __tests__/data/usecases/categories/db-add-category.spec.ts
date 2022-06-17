import { mockCategory, mockCategoryParam } from '@/../__mocks__/mock-categories'
import { LoadCategoryByNameRepository } from '@/data/protocols/load-category-by-name-repository'
import { Category } from '@/domain/models/category'
import { DbAddCategory } from '@/data/usecases/db-add-category'
import mockDate from 'mockdate'

const mockLoadCategoryByNameRepository = (): LoadCategoryByNameRepository => {
  class LoadCategoryByNameRepositoryStub implements LoadCategoryByNameRepository {
    async loadByName (name: string): Promise<Category | null> {
      return null
    }
  }

  return new LoadCategoryByNameRepositoryStub()
}

type SutTypes = {
  sut: DbAddCategory
  loadCategoryByNameRepositoryStub: LoadCategoryByNameRepository
}

const makeSut = (): SutTypes => {
  const loadCategoryByNameRepositoryStub = mockLoadCategoryByNameRepository()
  const sut = new DbAddCategory(loadCategoryByNameRepositoryStub)
  return { sut, loadCategoryByNameRepositoryStub }
}

describe('Db Add Category', () => {
  beforeAll(async () => {
    mockDate.set(new Date())
  })
  afterAll(async () => {
    mockDate.reset()
  })
  test('should call LoadCategoryByNameRepository with correct name', async () => {
    const { sut, loadCategoryByNameRepositoryStub } = makeSut()
    const loadByNameSpy = jest.spyOn(loadCategoryByNameRepositoryStub, 'loadByName')
    await sut.add(mockCategoryParam())
    expect(loadByNameSpy).toHaveBeenCalledWith(mockCategoryParam().name)
  })
  test('should return a Category if LoadCategoryByNameRepository return a category', async () => {
    const { sut, loadCategoryByNameRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryByNameRepositoryStub, 'loadByName').mockReturnValueOnce(Promise.resolve(mockCategory()))
    const result = await sut.add(mockCategoryParam())
    expect(result).toEqual(mockCategory())
  })
})
