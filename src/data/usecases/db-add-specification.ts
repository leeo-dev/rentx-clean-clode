import { Specification } from '@/domain/models/specification'
import { AddSpecification, SpecificationParam } from '@/domain/protocols/add-specification'
import { LoadSpecificationByNameRepository } from '@/data/protocols/load-specification-by-name-repository'

export class DbAddSpecification implements AddSpecification {
  constructor (private readonly loadSpecificationByNameRepository: LoadSpecificationByNameRepository) {}
  async add ({ name, description }: SpecificationParam): Promise<Specification | null> {
    const specification = await this.loadSpecificationByNameRepository.loadByName(name)
    console.log('-----------------------')
    console.log(specification)
    console.log('-----------------------')
    if (specification) return specification
    return null
  }
}
