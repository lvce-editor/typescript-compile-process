import * as HandleElectronMessagePort from '../HandleElectronMessagePort/HandleElectronMessagePort.ts'
import * as TranspileTypeScript from '../TranspileTypeScript/TranspileTypeScript.ts'
import * as TypeScriptPath from '../TypeScriptPath/TypeScriptPath.ts'

export const commandMap = {
  'TranspileTypeScript.transpileTypeScript':
    TranspileTypeScript.transpileTypeScript,
  'TypeScript.setTypeScriptPath': TypeScriptPath.set,
  'HandleElectronMessagePort.handleElectronMessagePort':
    HandleElectronMessagePort.handleElectronMessagePort,
}
