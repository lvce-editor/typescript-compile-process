import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { root } from './root.js'

const readJson = async (path) => {
  const content = await readFile(path, 'utf8')
  return JSON.parse(content)
}

export const getWsVersionFromLockfile = async () => {
  const lockfilePath = join(root, 'package-lock.json')
  const lockfile = await readJson(lockfilePath)

  // ws is always installed as a dependency of @lvce-editor/rpc
  const wsPackage =
    lockfile.packages?.['packages/typescript-compile-process/node_modules/ws'] || lockfile.packages?.['node_modules/ws']
  if (wsPackage?.version) {
    return `^${wsPackage.version}`
  }

  throw new Error('Could not find ws version in package-lock.json. Make sure @lvce-editor/rpc is installed.')
}
