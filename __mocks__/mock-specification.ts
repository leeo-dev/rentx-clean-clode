import { Specification } from '@/domain/models/specification'
import { SpecificationParam } from '@/domain/protocols/add-specification'
export const mockSpecification = (): Specification => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  created_at: new Date()
})

export const mockSpecificationParam = (): SpecificationParam => ({
  name: 'any_name',
  description: 'any_description'
})
