import * as Command from '../src/parts/Command/Command.js'
import * as CommandState from '../src/parts/CommandState/CommandState.js'
import { test, expect, jest } from '@jest/globals'

test('execute - error - command not found', () => {
  CommandState.registerCommands({})
  expect(() => Command.execute('Test.test')).toThrow(new Error(`Command not found Test.test`))
})

test('execute - error - command not found', () => {
  const testFn = jest.fn(() => {
    return 1
  })
  CommandState.registerCommands({
    'Test.test': testFn,
  })
  expect(Command.execute('Test.test')).toBe(1)
  expect(testFn).toHaveBeenCalledTimes(1)
})
