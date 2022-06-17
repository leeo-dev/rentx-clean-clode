import { CategoryParam } from '@/domain/protocols/add-category'

export interface AddCategoryRepository {
  add: (categoryData: CategoryParam) => Promise<void>
}
