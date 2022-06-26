import { AccountParam, DbCreateAccount } from '@/domain/protocols/create-account'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { HttpRequest } from '@/presentation/protocols'
import { Account } from '@/domain/models/account'

export const mockAccount = (): Account => (
  {
    id: 'any_id',
    name: 'any_name',
    password: 'any_password',
    email: 'any_email@mail.com',
    drive_license: 'any_drive_license',
    admin: false,
    avatar: 'string',
    created_at: new Date()
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

export const mockDbCreateAccount = (): DbCreateAccount => {
  class DbCreateAccountStub implements DbCreateAccount {
    async create (accountParam: AccountParam): Promise<Account | null> {
      return null
    }
  }
  return new DbCreateAccountStub()
}
