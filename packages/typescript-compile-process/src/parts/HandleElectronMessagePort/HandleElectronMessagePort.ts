import * as Assert from '../Assert/Assert.ts'
import * as IpcChild from '../IpcChild/IpcChild.ts'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'

export const handleElectronMessagePort = async (messagePort, ipcId) => {
  Assert.object(messagePort)
  // Assert.number(ipcId)
  // TODO use handleIncomingIpc function
  await IpcChild.listen({
    method: IpcChildType.ElectronMessagePort,
    messagePort,
  })
}
