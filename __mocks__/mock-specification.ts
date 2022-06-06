import { Specification } from '@/domain/models/specification'
import { AddSpecification, SpecificationParam } from '@/domain/protocols/add-specification'
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

export const mockAddSpecificationStub = (): AddSpecification => {
  class AddSpecificationStub implements AddSpecification {
    async add (add: SpecificationParam): Promise<Specification | null> {
      return null
    }
  }
  return new AddSpecificationStub()
}
