import * as Assert from '../Assert/Assert.ts'
import * as HandleIpc from '../HandleIpc/HandleIpc.ts'
import * as IpcChild from '../IpcChild/IpcChild.ts'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'

export const handleElectronMessagePort = async (messagePort, ipcId) => {
  Assert.object(messagePort)
  // Assert.number(ipcId)
  // TODO use handleIncomingIpc function
  const ipc = await IpcChild.listen({
    method: IpcChildType.ElectronMessagePort,
    messagePort,
  })
  HandleIpc.handleIpc(ipc)
}
