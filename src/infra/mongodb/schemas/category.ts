import { Schema, model, now } from 'mongoose'
type CategorySchema = {
  name: string
  description: string
  created_at: Date
}

const categorySchema = new Schema<CategorySchema>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: now() }
})

export const CategoryMongo = model<CategorySchema>('Category', categorySchema)
