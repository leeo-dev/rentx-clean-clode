import { HttpResponse } from '@/presentation/protocols/http'
export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const hasBeenCreated = (): HttpResponse => {
  return {
    statusCode: 201,
    body: null
  }
}
