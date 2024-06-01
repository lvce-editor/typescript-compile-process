import { VError } from '@lvce-editor/verror'
import * as ImportScript from '../ImportScript/ImportScript.ts'

export const loadTypeScript = async (typescriptPath) => {
  try {
    const typescript = await ImportScript.importScript(typescriptPath)
    const actual = typescript.default
    if (!actual) {
      throw new Error('missing default export')
    }
    return actual
  } catch (error) {
    throw new VError(error, `Failed to load typescript`)
  }
}
