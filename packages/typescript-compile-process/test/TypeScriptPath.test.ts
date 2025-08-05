import { expect, test } from '@jest/globals'
import * as TypeScriptPath from '../src/parts/TypeScriptPath/TypeScriptPath.ts'

test('get / set', () => {
  TypeScriptPath.set('/test/typescript.js')
  expect(TypeScriptPath.get()).toBe('/test/typescript.js')
})
