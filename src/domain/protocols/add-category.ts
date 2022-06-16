import { Category } from '../models/category'

export type CategoryParam = {
  name: string
  description: string
}

export interface AddCategory {
  add: (categoryParams: CategoryParam) => Promise<Category | null>

}
