import * as HandleElectronMessagePort from '../HandleElectronMessagePort/HandleElectronMessagePort.ts'
import * as TranspileTypeScript from '../TranspileTypeScript/TranspileTypeScript.ts'
import * as TranspileTypeScriptAtPath from '../TranspileTypeScriptAtPath/TranspileTypeScriptAtPath.ts'
import * as TypeScriptPath from '../TypeScriptPath/TypeScriptPath.ts'

export const commandMap = {
  'TranspileTypeScript.transpileTypeScript': TranspileTypeScript.transpileTypeScript,
  'TranspileTypeScript.transpileTypeScriptAtPath': TranspileTypeScriptAtPath.transpileTypeScriptAtPath,
  'TypeScript.setTypeScriptPath': TypeScriptPath.set,
  'HandleElectronMessagePort.handleElectronMessagePort': HandleElectronMessagePort.handleElectronMessagePort,
}
