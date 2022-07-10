import { DbCreateAccount } from '@/data/usecases/db-create-account'
import { AccountMongoRepository } from '@/infra/mongodb/account-mongo-repository'
import { CreateAccountController } from '@/presentation/controllers/account/create-account-controller'
import { Controller } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/validation/validators/email-validator'

export const makeAccountController = (): Controller => {
  const accountMongo = new AccountMongoRepository()
  const createAccount = new DbCreateAccount(accountMongo, accountMongo)
  const emailValidator = new EmailValidatorAdapter()
  return new CreateAccountController(emailValidator, createAccount)
}
