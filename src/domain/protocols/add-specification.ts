import { Specification } from '../models/specification'

export type SpecificationParam = {
  name: string
  description: string
}

export interface AddSpecification {
  add: (specificationParams: SpecificationParam) => Promise<Specification | null>

}
