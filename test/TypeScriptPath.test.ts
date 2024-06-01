import { expect, test } from '@jest/globals'
import * as TypeScriptPath from '../src/parts/TypeScriptPath/TypeScriptPath.js'

test('get / set', () => {
  TypeScriptPath.set('/test/typescript.js')
  expect(TypeScriptPath.get()).toBe('/test/typescript.js')
})
