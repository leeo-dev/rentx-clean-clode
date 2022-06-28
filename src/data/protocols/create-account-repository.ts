import { AccountParam } from '@/domain/protocols/create-account'
export interface CreateAccountRepository {
  create: (account: AccountParam) => Promise<void>
}
