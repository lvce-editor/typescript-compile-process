import * as IpcChild from '../IpcChild/IpcChild.ts'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'
import * as CommandMap from '../CommandMap/CommandMap.ts'

export const listen = async () => {
  await IpcChild.listen({
    commandMap: CommandMap.commandMap,
    method: IpcChildType.Auto(),
  })
}
