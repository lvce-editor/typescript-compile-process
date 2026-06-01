import { existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const extensionApiRelativePath = join('packages', 'extension-api', 'src', 'index.ts')
const extensionApiEnvName = 'LVCE_EDITOR_EXTENSION_API_PATH'
const maxParentDepth = 6

const getRemoteUrl = (path: string): string => {
  return `/remote${path}`
}

const getParentDirectories = (path: string): readonly string[] => {
  const roots: string[] = []
  let current = path
  for (let i = 0; i < maxParentDepth; i++) {
    roots.push(current)
    const parent = dirname(current)
    if (parent === current) {
      break
    }
    current = parent
  }
  return roots
}

const getSiblingExtensionApiPaths = (root: string): readonly string[] => {
  try {
    const entries = readdirSync(root, { withFileTypes: true })
    const paths: string[] = []
    for (const entry of entries) {
      if (entry.isDirectory()) {
        paths.push(join(root, entry.name, extensionApiRelativePath))
      }
    }
    return paths
  } catch {
    return []
  }
}

export const getCandidateExtensionApiPaths = (cwd = process.cwd(), moduleUrl = import.meta.url): readonly string[] => {
  const modulePath = dirname(fileURLToPath(moduleUrl))
  const roots = [...getParentDirectories(cwd), ...getParentDirectories(modulePath)]
  const candidates = [
    process.env[extensionApiEnvName],
    ...roots.map((root) => join(root, extensionApiRelativePath)),
    ...roots.flatMap(getSiblingExtensionApiPaths),
  ]
  const definedCandidates: string[] = []
  for (const candidate of candidates) {
    if (candidate) {
      definedCandidates.push(candidate)
    }
  }
  return [...new Set(definedCandidates)]
}

export const getExtensionApiPath = (candidates = getCandidateExtensionApiPaths()): string => {
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate
    }
  }
  return ''
}

export const rewriteLvceEditorApiImports = (code: string, extensionApiPath = getExtensionApiPath()): string => {
  if (!extensionApiPath) {
    return code
  }
  const extensionApiUrl = getRemoteUrl(extensionApiPath)
  return code.replaceAll(/(['"])@lvce-editor\/api\1/g, (_match: string, quote: string) => {
    return `${quote}${extensionApiUrl}${quote}`
  })
}
