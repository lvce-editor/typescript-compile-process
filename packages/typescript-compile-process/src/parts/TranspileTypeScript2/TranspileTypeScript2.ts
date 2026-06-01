import { VError } from '@lvce-editor/verror'
import * as RewriteLvceEditorApiImports from '../RewriteLvceEditorApiImports/RewriteLvceEditorApiImports.ts'

export const transpileTypeScript2 = async (code: string) => {
  try {
    const { stripTypeScriptTypes } = await import('node:module')
    const transformed = stripTypeScriptTypes(code)
    return RewriteLvceEditorApiImports.rewriteLvceEditorApiImports(transformed)
  } catch (error) {
    throw new VError(error, `Failed to transpile typescript`)
  }
}
