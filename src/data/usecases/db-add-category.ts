import { LoadCategoryByNameRepository } from '@/data/protocols/load-category-by-name-repository'
import { Category } from '@/domain/models/category'
import { AddCategory, CategoryParam } from '@/domain/protocols/add-category'

export class DbAddCategory implements AddCategory {
  constructor (private readonly loadCategoryByNameRepository: LoadCategoryByNameRepository) {}
  async add (categoryParams: CategoryParam): Promise<Category | null> {
    const { name } = categoryParams
    await this.loadCategoryByNameRepository.loadByName(name)
    return null
  }
}
