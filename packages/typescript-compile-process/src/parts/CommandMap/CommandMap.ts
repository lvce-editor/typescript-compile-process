import * as HandleElectronMessagePort from '../HandleElectronMessagePort/HandleElectronMessagePort.ts'
import * as TranspileTypeScript2 from '../TranspileTypeScript2/TranspileTypeScript2.ts'
import * as TranspileTypeScript from '../TranspileTypeScript/TranspileTypeScript.ts'
import * as TranspileTypeScriptAtPath from '../TranspileTypeScriptAtPath/TranspileTypeScriptAtPath.ts'
import * as TypeScriptPath from '../TypeScriptPath/TypeScriptPath.ts'

export const commandMap = {
  'HandleElectronMessagePort.handleElectronMessagePort': HandleElectronMessagePort.handleElectronMessagePort,
  'TranspileTypeScript.transpileTypeScript': TranspileTypeScript.transpileTypeScript,
  'TranspileTypeScript.transpileTypeScript2': TranspileTypeScript2.transpileTypeScript2,
  'TranspileTypeScript.transpileTypeScriptAtPath': TranspileTypeScriptAtPath.transpileTypeScriptAtPath,
  'TypeScript.setTypeScriptPath': TypeScriptPath.set,
}
