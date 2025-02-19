import * as Command from '@lvce-editor/command'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as Listen from '../Listen/Listen.ts'

export const main = async () => {
  Command.register(CommandMap.commandMap)
  await Listen.listen()
}
