import { EmailValidatorAdapter } from '@/validation/validators/email-validator'
import { EmailValidator } from '@/validation/protocols/email-validator'
import validator from 'validator'
import { mockError } from './../../../__mocks__/mockError'
jest.mock('validator', () => ({
  isEmail: (): Boolean => {
    return true
  }
}))

type SutTypes = {
  sut: EmailValidator
}
const makeSut = (): SutTypes => {
  const sut = new EmailValidatorAdapter()
  return { sut }
}
describe('E-mailValidator Adapter', () => {
  test('should return false if validator returns false', async () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = await sut.validate('invalid_email@mail.com')
    expect(isValid).toBeFalsy()
  })
  test('should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.validate('valid_email@mail.com')
    expect(isValid).toBeTruthy()
  })
  test('should throws if validator throw', async () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(mockError)

    const promise = sut.validate('valid_email@mail.com')
    await expect(promise).rejects.toThrow()
  })
})
