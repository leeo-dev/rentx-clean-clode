import { SpecificationParam } from '@/domain/protocols/add-specification'

export interface AddSpecificationRepository {
  add: (specificationParams: SpecificationParam) => Promise<void>
}
