import { Schema, model, now } from 'mongoose'
type SpecificationSchema = {
  name: string
  description: string
  created_at: Date
}

const specificationSchema = new Schema<SpecificationSchema>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: now() }
})

export const SpecificationMongo = model<SpecificationSchema>('Specification', specificationSchema)
