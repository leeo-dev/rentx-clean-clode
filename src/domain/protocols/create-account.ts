import { Account } from '../models/account'

export type AccountParam = {
  name: string
  password: string
  email: string
  driveLicense: string
}
export interface DbCreateAccount {
  create: (accountParam: AccountParam) => Promise<Account | null>
}
