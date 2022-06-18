import { DbAddCategory } from '@/data/usecases/db-add-category'
import { CategoryMongoDb } from '@/infra/mongodb/category-mongodb'
import { AddCategoryController } from '@/presentation/controllers/categories/add-category-controller'
import { Controller } from '@/presentation/protocols/controller'
export const makeCategoryController = (): Controller => {
  const categoryMongoDb = new CategoryMongoDb()
  const addCategory = new DbAddCategory(categoryMongoDb, categoryMongoDb)
  return new AddCategoryController(addCategory)
}
