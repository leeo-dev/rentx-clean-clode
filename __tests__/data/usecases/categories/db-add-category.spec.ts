import { mockCategoryParam } from '@/../__mocks__/mock-categories'
import { LoadCategoryByNameRepository } from '@/data/protocols/load-category-by-name-repository'
import { Category } from '@/domain/models/category'
import { DbAddCategory } from '@/data/usecases/db-add-category'

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
  test('should call LoadCategoryByNameRepository with correct name', async () => {
    const { sut, loadCategoryByNameRepositoryStub } = makeSut()
    const loadByNameSpy = jest.spyOn(loadCategoryByNameRepositoryStub, 'loadByName')
    await sut.add(mockCategoryParam())
    expect(loadByNameSpy).toHaveBeenCalledWith(mockCategoryParam().name)
  })
})
