import { VError } from '@lvce-editor/verror'

export const transpileTypeScript2 = async (code: string) => {
  try {
    const { stripTypeScriptTypes } = await import('node:module')
    const transformed = stripTypeScriptTypes(code)
    return transformed
  } catch (error) {
    throw new VError(error, `Failed to transpile typescript`)
  }
}
