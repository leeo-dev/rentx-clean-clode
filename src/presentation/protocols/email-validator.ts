export interface EmailValidator {
  validate: (email: string) => Promise<Boolean>

}
