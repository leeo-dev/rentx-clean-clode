import { MongooseHelper } from './helpers/mongoose-helper'
import { CreateAccountRepository } from '@/data/protocols/create-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'
import { Account } from '@/domain/models/account'
import { AccountParam } from '@/domain/protocols/create-account'
import { AccountMongo } from './schemas/account'

export class AccountMongoRepository implements CreateAccountRepository, LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<Account | null> {
    const account = await AccountMongo.findOne({ email })
    return account && MongooseHelper.map(account)
  }

  async create (accountParam: AccountParam): Promise<void> {
    const account = new AccountMongo({ ...accountParam })
    await account.save()
  }
}
