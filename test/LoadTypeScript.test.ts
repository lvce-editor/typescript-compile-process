import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/ImportScript/ImportScript.ts', () => {
  return {
    importScript: jest.fn(),
  }
})

const ImportScript = await import('../src/parts/ImportScript/ImportScript.ts')
const LoadTypeScript = await import('../src/parts/LoadTypeScript/LoadTypeScript.ts')

test('loadTypeScript', async () => {
  const typescript = {}
  // @ts-ignore
  jest.spyOn(ImportScript, 'importScript').mockImplementation(() => {
    return {
      default: typescript,
    }
  })
  const typescriptPath = '/test/typscript.js'
  expect(await LoadTypeScript.loadTypeScript(typescriptPath)).toBe(typescript)
})

test('loadTypeScript - error - missing default export', async () => {
  const typescript = {}
  // @ts-ignore
  jest.spyOn(ImportScript, 'importScript').mockImplementation(() => {
    return {}
  })
  const typescriptPath = '/test/typscript.js'
  await expect(LoadTypeScript.loadTypeScript(typescriptPath)).rejects.toThrow(
    new Error('Failed to load typescript: missing default export'),
  )
})

test('loadTypeScript - error', async () => {
  // @ts-ignore
  jest.spyOn(ImportScript, 'importScript').mockImplementation(() => {
    throw new TypeError('x is not a function')
  })
  const typescriptPath = '/test/typscript.js'
  await expect(LoadTypeScript.loadTypeScript(typescriptPath)).rejects.toThrow(
    new Error('Failed to load typescript: TypeError: x is not a function'),
  )
})
