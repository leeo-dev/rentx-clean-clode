import { Specification } from '@/domain/models/specification'
import { AddSpecification, SpecificationParam } from '@/domain/protocols/add-specification'
import { LoadSpecificationByNameRepository } from '@/data/protocols/load-specification-by-name-repository'

export class DbAddSpecification implements AddSpecification {
  constructor (private readonly loadSpecificationByNameRepository: LoadSpecificationByNameRepository) {}
  async add ({ name, description }: SpecificationParam): Promise<Specification | null> {
    await this.loadSpecificationByNameRepository.loadByName(name)
    return null
  }
}
