export class TypeScriptNotFoundError extends Error {
  code: string

  constructor(typescriptPath: string) {
    super(`Failed to load typescript: Typescript not found at "${typescriptPath}"`)
    this.code = 'E_TYPESCRIPT_NOT_FOUND'
  }
}
