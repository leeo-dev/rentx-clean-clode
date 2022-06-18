import { Schema, model, now } from 'mongoose'
type CategorySchema = {
  name: string
  password: string
  email: string
  drive_license: string
  admin: boolean
  avatar: string
  created_at: Date
}

const categorySchema = new Schema<CategorySchema>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  drive_license: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  avatar: { type: String, required: true },
  created_at: { type: Date, default: now() }
})

export const CategoryMongo = model<CategorySchema>('Category', categorySchema)
