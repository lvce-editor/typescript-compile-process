import { VError } from '@lvce-editor/verror'
import * as ImportScript from '../ImportScript/ImportScript.ts'
import { isModuleNotFoundError } from '../isModuleNotFoundError/IsModuleNotFoundError.ts'
import { TypeScriptNotFoundError } from '../TypeScriptNotFoundError/TypeScriptNotFoundError.ts'

export const loadTypeScript = async (typescriptPath: string) => {
  try {
    const typescript = await ImportScript.importScript(typescriptPath)
    const actual = typescript.default
    if (!actual) {
      throw new Error('missing default export')
    }
    return actual
  } catch (error) {
    if (isModuleNotFoundError(error)) {
      throw new TypeScriptNotFoundError()
    }
    throw new VError(error, `Failed to load typescript`)
  }
}
