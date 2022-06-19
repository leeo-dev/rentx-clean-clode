import { CreateAccountController } from '@/presentation/controllers/account/create-account-controller'
import { MissingParamError } from '@/presentation/error'
import { badRequest } from '@/presentation/helpers/http-helper'

type SutTypes = {
  sut: CreateAccountController
}
const makeSut = (): SutTypes => {
  const sut = new CreateAccountController()
  return { sut }
}
describe('Create Account Controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password',
        email: 'email',
        drive_license: 'any_drive_license',
        avatar: 'any_avatar'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
})
