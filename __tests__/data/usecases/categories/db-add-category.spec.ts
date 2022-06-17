import { mockCategory, mockCategoryParam } from '@/../__mocks__/mock-categories'
import { LoadCategoryByNameRepository } from '@/data/protocols/load-category-by-name-repository'
import { Category } from '@/domain/models/category'
import { DbAddCategory } from '@/data/usecases/db-add-category'
import { CategoryParam } from '@/domain/protocols/add-category'
import { AddCategoryRepository } from '@/data/protocols/add-category-repository'
import mockDate from 'mockdate'

const mockLoadCategoryByNameRepository = (): LoadCategoryByNameRepository => {
  class LoadCategoryByNameRepositoryStub implements LoadCategoryByNameRepository {
    async loadByName (name: string): Promise<Category | null> {
      return null
    }
  }

  return new LoadCategoryByNameRepositoryStub()
}

const mockAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (category: CategoryParam): Promise<void> {
    }
  }

  return new AddCategoryRepositoryStub()
}

type SutTypes = {
  sut: DbAddCategory
  loadCategoryByNameRepositoryStub: LoadCategoryByNameRepository
  addCategoryRepositoryStub: AddCategoryRepository
}

const makeSut = (): SutTypes => {
  const loadCategoryByNameRepositoryStub = mockLoadCategoryByNameRepository()
  const addCategoryRepositoryStub = mockAddCategoryRepository()
  const sut = new DbAddCategory(loadCategoryByNameRepositoryStub, addCategoryRepositoryStub)
  return { sut, loadCategoryByNameRepositoryStub, addCategoryRepositoryStub }
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
  test('should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryStub, 'add')
    await sut.add(mockCategoryParam())
    expect(addSpy).toHaveBeenCalledWith(mockCategoryParam())
  })
  test('should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    jest.spyOn(addCategoryRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockCategoryParam())
    await expect(promise).rejects.toThrow()
  })
})
