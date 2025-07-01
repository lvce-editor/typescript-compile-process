import * as config from '@lvce-editor/eslint-config'

export default [
  ...config.default,
  ...config.recommendedNode,
  {
    ignores: ['src/typescriptCompileProcessMain.ts', 'bin'],
  },
  {
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'jest/no-restricted-jest-methods': 'off',
    },
  },
]
