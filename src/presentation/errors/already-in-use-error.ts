export class AlreadyInUseError extends Error {
  constructor (entity: string) {
    super(`${entity} already in use!`)
    this.name = 'AlreadyInUseError'
  }
}
