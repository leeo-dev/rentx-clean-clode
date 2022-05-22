export type SpecificationParam = {
  name: string
  description: string
}

export interface AddSpecification {
  add: (add: SpecificationParam) => Promise<void>

}
