import * as Callback from '../Callback/Callback.ts'
import * as Command from '../Command/Command.ts'
import * as JsonRpc from '../JsonRpc/JsonRpc.js'

const prepare = (error) => {
  return error
}

const requiresSocket = (method) => {
  return false
}

const logError = (error, prettyError) => {
  console.error(error)
}

export const handleMessage = (event) => {
  return JsonRpc.handleJsonRpcMessage(
    event.target,
    event.data,
    Command.execute,
    Callback.resolve,
    prepare,
    logError,
    requiresSocket,
  )
}
