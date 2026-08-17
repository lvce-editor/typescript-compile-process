import { build } from 'esbuild'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { root } from './root.js'

export const bundleExtensionApi = async () => {
  await build({
    bundle: true,
    entryPoints: [fileURLToPath(import.meta.resolve('@lvce-editor/api'))],
    external: ['electron', 'node:buffer', 'node:worker_threads'],
    format: 'esm',
    outfile: join(root, '.tmp', 'dist', 'dist', 'extensionApi.js'),
    platform: 'browser',
  })
}
