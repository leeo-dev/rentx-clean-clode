import { Schema, model } from 'mongoose'
type SpecificationSchema = {
  name: string
  description: string
}

const specificationSchema = new Schema<SpecificationSchema>({
  name: { type: String, required: true },
  description: { type: String, required: true }
})

export const SpecificationMongo = model<SpecificationSchema>('Specification', specificationSchema)
