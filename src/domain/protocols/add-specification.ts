import { Specification } from '../models/specification'

export type SpecificationParam = {
  name: string
  description: string
}

export interface AddSpecification {
  add: (add: SpecificationParam) => Promise<Specification | null>

}
