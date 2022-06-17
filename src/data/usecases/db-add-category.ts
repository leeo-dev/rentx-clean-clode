import { LoadCategoryByNameRepository } from '@/data/protocols/load-category-by-name-repository'
import { Category } from '@/domain/models/category'
import { AddCategory, CategoryParam } from '@/domain/protocols/add-category'
import { AddCategoryRepository } from '@/data/protocols/add-category-repository'

export class DbAddCategory implements AddCategory {
  constructor (private readonly loadCategoryByNameRepository: LoadCategoryByNameRepository,
    private readonly addCategoryRepository: AddCategoryRepository
  ) {}

  async add (categoryParams: CategoryParam): Promise<Category | null> {
    const { name, description } = categoryParams
    const category = await this.loadCategoryByNameRepository.loadByName(name)
    if (category) return category
    await this.addCategoryRepository.add({ name, description })
    return null
  }
}
