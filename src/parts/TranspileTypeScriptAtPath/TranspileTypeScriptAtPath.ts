import { VError } from '@lvce-editor/verror'
import * as TranspileTypeScript from '../TranspileTypeScript/TranspileTypeScript.ts'
import { readFile, writeFile } from 'node:fs/promises'

export const transpileTypeScriptAtPath = async (inPath: string, outPath: string): Promise<void> => {
  try {
    const content = await readFile(inPath, 'utf-8')
    const newContent = await TranspileTypeScript.transpileTypeScript(content)
    await writeFile(outPath, newContent)
  } catch (error) {
    throw new VError(error, `Failed to transpile typescript`)
  }
}
