import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/LoadTypeScript/LoadTypeScript.ts', () => {
  return {
    loadTypeScript: jest.fn(),
  }
})

const TranspileTypeScript = await import('../src/parts/TranspileTypeScript/TranspileTypeScript.ts')
const LoadTypeScript = await import('../src/parts/LoadTypeScript/LoadTypeScript.ts')

test('transpileTypeScript - error - failed to load typescript', async () => {
  jest.spyOn(LoadTypeScript, 'loadTypeScript').mockImplementation(() => {
    throw new Error(`Failed to load typescript`)
  })
  const code = ``
  await expect(TranspileTypeScript.transpileTypeScript(code)).rejects.toThrow(
    new Error(`Failed to transpile typescript: Failed to load typescript`),
  )
})
