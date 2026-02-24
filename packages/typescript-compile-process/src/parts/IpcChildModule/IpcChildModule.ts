import {
  ElectronMessagePortRpcClient,
  ElectronUtilityProcessRpcClient,
  NodeForkedProcessRpcClient,
  WebSocketRpcParent,
} from '@lvce-editor/rpc'
import * as IpcChildType from '../IpcChildType/IpcChildType.ts'

export const getModule = (method: number) => {
  switch (method) {
    case IpcChildType.ElectronMessagePort:
      return ElectronMessagePortRpcClient
    case IpcChildType.ElectronUtilityProcess:
      return ElectronUtilityProcessRpcClient
    case IpcChildType.NodeForkedProcess:
      return NodeForkedProcessRpcClient
    case IpcChildType.WebSocket:
      return WebSocketRpcParent
    default:
      throw new Error('unexpected ipc type')
  }
}
