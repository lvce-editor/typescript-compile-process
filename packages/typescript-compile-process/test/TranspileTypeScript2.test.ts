import { expect, test } from '@jest/globals'
import { transpileTypeScript2 } from '../src/parts/TranspileTypeScript2/TranspileTypeScript2.ts'

test('transpileTypeScript - error', async () => {
  const code = 'let x: == 1'
  await expect(transpileTypeScript2(code)).rejects.toThrow(
    new Error(
      'Failed to transpile typescript: SyntaxError [ERR_INVALID_TYPESCRIPT_SYNTAX]: Unexpected token `==`. Expected an identifier, void, yield, null, await, break, a string literal, a numeric literal, true, false, `, -, import, this, typeof, {, [, (',
    ),
  )
})

test('transpileTypeScript - error - failed to load typescript', async () => {
  const code = 'let x: number = 1'
  expect(await transpileTypeScript2(code)).toBe('let x         = 1')
})
