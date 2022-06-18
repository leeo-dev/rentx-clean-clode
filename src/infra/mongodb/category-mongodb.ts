import { MongooseHelper } from './helpers/mongoose-helper'
import { AddCategoryRepository } from '@/data/protocols/add-category-repository'
import { LoadCategoryByNameRepository } from '@/data/protocols/load-category-by-name-repository'
import { Category } from '@/domain/models/category'
import { CategoryParam } from '@/domain/protocols/add-category'
import { CategoryMongo } from './schemas/category'
export class CategoryMongoDb implements LoadCategoryByNameRepository, AddCategoryRepository {
  async add (categoryData: CategoryParam): Promise<void> {
    const category = new CategoryMongo({ ...categoryData })
    await category.save()
  }

  async loadByName (name: string): Promise<Category | null> {
    const category = await CategoryMongo.findOne({ name })
    return category && MongooseHelper.map(category)
  }
}
