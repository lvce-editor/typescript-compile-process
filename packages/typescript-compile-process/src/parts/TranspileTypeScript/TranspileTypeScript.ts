import { VError } from '@lvce-editor/verror'
import * as Assert from '../Assert/Assert.ts'
import * as LoadTypeScript from '../LoadTypeScript/LoadTypeScript.ts'
import * as RewriteLvceEditorApiImports from '../RewriteLvceEditorApiImports/RewriteLvceEditorApiImports.ts'
import * as TypeScriptPath from '../TypeScriptPath/TypeScriptPath.ts'

export const transpileTypeScript = async (code: string) => {
  try {
    Assert.string(code)
    const typescriptUri = TypeScriptPath.get()
    const typescript = await LoadTypeScript.loadTypeScript(typescriptUri)
    const newContent = await typescript.transpileModule(code, {
      compilerOptions: {
        target: 'esnext',
      },
    })
    return {
      ...newContent,
      outputText: RewriteLvceEditorApiImports.rewriteLvceEditorApiImports(newContent.outputText),
    }
  } catch (error) {
    throw new VError(error, `Failed to transpile typescript`)
  }
}
