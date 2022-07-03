import { EmailValidator } from '../protocols/email-validator'
import validator from 'validator'
export class EmailValidatorAdapter implements EmailValidator {
  async validate (email: string): Promise<Boolean> {
    const isValid = validator.isEmail(email)
    return isValid
  }
}
