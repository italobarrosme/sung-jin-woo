import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslint.configs.recommended,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', './.eslintrc.json'],
  }),
]

export default eslintConfig
