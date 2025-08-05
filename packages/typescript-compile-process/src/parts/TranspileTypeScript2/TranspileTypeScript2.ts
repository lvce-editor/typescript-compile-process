import { VError } from '@lvce-editor/verror'
import { stripTypeScriptTypes } from 'node:module'

export const transpileTypeScript2 = async (code: string) => {
  try {
    const transformed = stripTypeScriptTypes(code)
    return transformed
  } catch (error) {
    throw new VError(error, `Failed to transpile typescript`)
  }
}
