import { CreateAccountRepository } from '@/data/protocols/create-account-repository'
import { AccountParam } from '@/domain/protocols/create-account'
import { AccountMongo } from './schemas/account'

export class AccountMongoRepository implements CreateAccountRepository {
  async create (accountParam: AccountParam): Promise<void> {
    const account = new AccountMongo({ ...accountParam })
    await account.save()
  }
}
