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
