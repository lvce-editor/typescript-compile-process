// cspell:ignore worktrees
import { expect, test } from '@jest/globals'
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import * as RewriteLvceEditorApiImports from '../src/parts/RewriteLvceEditorApiImports/RewriteLvceEditorApiImports.ts'

test('rewriteLvceEditorApiImports - no extension api path', () => {
  const code = `import { activate } from '@lvce-editor/api'`
  expect(RewriteLvceEditorApiImports.rewriteLvceEditorApiImports(code, '')).toBe(code)
})

test('rewriteLvceEditorApiImports', async () => {
  const root = await mkdtemp(join(tmpdir(), 'typescript-compile-process-'))
  const extensionApiPath = join(root, '.tmp', 'dist', 'dist', 'extension-api', 'index.js')
  await mkdir(join(root, '.tmp', 'dist', 'dist', 'extension-api'), { recursive: true })
  await writeFile(extensionApiPath, 'export {}')

  const code = `import { activate } from '@lvce-editor/api'`
  expect(RewriteLvceEditorApiImports.rewriteLvceEditorApiImports(code, extensionApiPath)).toBe(
    `import { activate } from '/remote${extensionApiPath}'`,
  )
})

test('getExtensionApiPath - direct parent', async () => {
  const root = await mkdtemp(join(tmpdir(), 'typescript-compile-process-'))
  const extensionApiPath = join(root, '.tmp', 'dist', 'dist', 'extension-api', 'index.js')
  await mkdir(join(root, '.tmp', 'dist', 'dist', 'extension-api'), { recursive: true })
  await writeFile(extensionApiPath, 'export {}')

  const candidates = RewriteLvceEditorApiImports.getCandidateExtensionApiPaths(join(root, 'packages', 'server'))
  expect(RewriteLvceEditorApiImports.getExtensionApiPath(candidates)).toBe(extensionApiPath)
})

test('getExtensionApiPath - bundled extension API', async () => {
  const root = await mkdtemp(join(tmpdir(), 'typescript-compile-process-'))
  const modulePath = join(root, 'dist', 'index.js')
  const extensionApiPath = join(dirname(modulePath), 'extensionApi.js')
  await mkdir(dirname(modulePath), { recursive: true })
  await writeFile(extensionApiPath, 'export {}')

  const candidates = RewriteLvceEditorApiImports.getCandidateExtensionApiPaths(join(root, 'server'), pathToFileURL(modulePath).toString())
  expect(RewriteLvceEditorApiImports.getExtensionApiPath(candidates)).toBe(extensionApiPath)
})

test('getExtensionApiPath - sibling project', async () => {
  const parent = await mkdtemp(join(tmpdir(), 'typescript-compile-process-'))
  const serverRoot = join(parent, 'lvce-editor')
  const extensionHostWorkerRoot = join(parent, 'extension-host-worker')
  const extensionApiPath = join(extensionHostWorkerRoot, '.tmp', 'dist', 'dist', 'extension-api', 'index.js')
  await mkdir(serverRoot, { recursive: true })
  await mkdir(join(extensionHostWorkerRoot, '.tmp', 'dist', 'dist', 'extension-api'), { recursive: true })
  await writeFile(extensionApiPath, 'export {}')

  const candidates = RewriteLvceEditorApiImports.getCandidateExtensionApiPaths(serverRoot)
  expect(RewriteLvceEditorApiImports.getExtensionApiPath(candidates)).toBe(extensionApiPath)
})

test('getExtensionApiPath - sibling project worktree', async () => {
  const parent = await mkdtemp(join(tmpdir(), 'typescript-compile-process-'))
  const serverRoot = join(parent, 'source-control-view.worktrees', 'direct-source-control-e2e')
  const extensionHostWorkerRoot = join(parent, 'extension-host-worker.worktrees', 'extension-api')
  const extensionApiPath = join(extensionHostWorkerRoot, '.tmp', 'dist', 'dist', 'extension-api', 'index.js')
  await mkdir(serverRoot, { recursive: true })
  await mkdir(join(extensionHostWorkerRoot, '.tmp', 'dist', 'dist', 'extension-api'), { recursive: true })
  await writeFile(extensionApiPath, 'export {}')

  const candidates = RewriteLvceEditorApiImports.getCandidateExtensionApiPaths(serverRoot)
  expect(candidates).toContain(extensionApiPath)
})
