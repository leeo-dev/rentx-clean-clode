import { Category } from '@/domain/models/category'

export interface LoadCategoryByNameRepository {
  loadByName: (name: string) => Promise<Category | null>

}
