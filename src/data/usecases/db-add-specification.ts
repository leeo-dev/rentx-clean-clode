import { Specification } from '@/domain/models/specification'
import { AddSpecification, SpecificationParam } from '@/domain/protocols/add-specification'
import { LoadSpecificationByNameRepository } from '@/data/protocols/load-specification-by-name-repository'
import { AddSpecificationRepository } from '../protocols/add-specification-repository'

export class DbAddSpecification implements AddSpecification {
  constructor (private readonly loadSpecificationByNameRepository: LoadSpecificationByNameRepository, private readonly addSpecificationRepository: AddSpecificationRepository) {}
  async add ({ name, description }: SpecificationParam): Promise<Specification | null> {
    const specification = await this.loadSpecificationByNameRepository.loadByName(name)
    if (specification) return specification
    await this.addSpecificationRepository.add({ name, description })
    return null
  }
}
