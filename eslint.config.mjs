import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  eslintConfigPrettier,
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/consistent-type-assertions': 'warn',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@/no-throw-literal': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variableLike', format: ['camelCase'], leadingUnderscore: 'allow' },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE', 'camelCase'],
          leadingUnderscore: 'allow'
        }
      ]
    }
  }
])
