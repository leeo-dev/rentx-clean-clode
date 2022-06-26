import { AccountParam, CreateAccount } from '@/domain/protocols/create-account'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { HttpRequest } from '@/presentation/protocols'
import { Account } from '@/domain/models/account'
import { LoadAccountByEmailRepository } from './data/protocols/load-account-by-email-repository'

export const mockAccount = (): Account => (
  {
    id: 'any_id',
    name: 'any_name',
    password: 'any_password',
    email: 'any_email@mail.com',
    driveLicense: 'any_drive_license',
    admin: false,
    avatar: 'string',
    created_at: new Date()
  }
)

export const mockAccountParam = (): AccountParam => (
  {
    name: 'any_name',
    password: 'any_password',
    email: 'any_email@mail.com',
    driveLicense: 'any_drive_license'
  }
)

export const mockHttpRequestAccount = (): HttpRequest => (
  {
    body: {
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@mail.com',
      driveLicense: 'any_driveLicense'
    }
  }
)

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    async validate (email: string): Promise<Boolean> {
      return true
    }
  }
  return new EmailValidatorStub()
}

export const mockDbCreateAccount = (): CreateAccount => {
  class DbCreateAccountStub implements CreateAccount {
    async create (accountParam: AccountParam): Promise<Account | null> {
      return null
    }
  }
  return new DbCreateAccountStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<Account | null> {
      return null
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
