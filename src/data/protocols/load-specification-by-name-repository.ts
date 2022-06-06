import { Specification } from '@/domain/models/specification'

export interface LoadSpecificationByNameRepository {
  loadByName: (name: string) => Promise<Specification | null>
}
