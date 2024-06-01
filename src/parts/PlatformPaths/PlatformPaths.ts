import * as Path from '../Path/Path.ts'
import * as Root from '../Root/Root.ts'

export const getBuiltinExtensionsPath = () => {
  return (
    process.env.BUILTIN_EXTENSIONS_PATH || Path.join(Root.root, 'extensions')
  )
}
