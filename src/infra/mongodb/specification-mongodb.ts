import { AddSpecificationRepository } from '@/data/protocols/add-specification-repository'
import { LoadSpecificationByNameRepository } from '@/data/protocols/load-specification-by-name-repository'
import { Specification } from '@/domain/models/specification'
import { SpecificationParam } from '@/domain/protocols/add-specification'
import { SpecificationMongo } from './schemas/specification'
import { MongooseHelper } from './helpers/mongoose-helper'

export class SpecificationMongoDb implements LoadSpecificationByNameRepository, AddSpecificationRepository {
  async add (specificationParams: SpecificationParam): Promise<void> {
    const specification = new SpecificationMongo(specificationParams)
    await specification.save()
  }

  async loadByName (name: string): Promise<Specification | null> {
    const specification = await SpecificationMongo.findOne({ name })
    return specification && MongooseHelper.map(specification)
  }
}
