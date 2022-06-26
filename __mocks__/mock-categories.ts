import { Category } from '@/domain/models/category'
import { CategoryParam, AddCategory } from './domain/protocols/add-category'
import { HttpRequest } from '@/presentation/protocols'
export const mockCategory = (): Category => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  created_at: new Date()
})

export const mockCategoryParam = (): CategoryParam => ({
  name: 'any_name',
  description: 'any_description'
})

export const mockAddCategory = (): AddCategory => {
  class AddCategoriesStub implements AddCategory {
    async add (add: CategoryParam): Promise<Category | null> {
      return null
    }
  }
  return new AddCategoriesStub()
}

export const httpCategoryRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    description: 'any_description'
  }
})
