export class TypeScriptNotFoundError extends Error {
  code: string

  constructor() {
    super('Failed to load typescript: Typescript not found')
    this.code = 'E_TYPESCRIPT_NOT_FOUND'
  }
}
