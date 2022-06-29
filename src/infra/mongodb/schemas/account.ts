import { Schema, model, now } from 'mongoose'
type AccountSchema = {
  name: string
  password: string
  email: string
  driveLicense: string
  admin: boolean
  avatar: string
  created_at: Date
}

const accountSchema = new Schema<AccountSchema>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  driveLicense: { type: String, required: true },
  admin: { type: Boolean, default: false },
  avatar: { type: String },
  created_at: { type: Date, default: now() }
})

export const AccountMongo = model<AccountSchema>('Account', accountSchema)
