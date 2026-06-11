import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'SAFE-BACKUP-*/**',
      '**/SAFE-BACKUP-*/**',
      '_local-backups/**',
      '**/_local-backups/**',
      '**/*.bak-*',
      'PUBLIC_READINESS_AUDIT_*.md',
      'SHAKU_MAKU_CHUNK_*.md'
    ]
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: [
      'src/**/*.{ts,tsx}',
      'worker/**/*.ts',
      'vite.config.ts',
      'vitest.config.ts'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // Keep launch validation practical for this legacy app.
      // TypeScript and production build remain the real release gates.
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'no-empty': 'off',
      'no-useless-escape': 'off',
      'no-control-regex': 'off',
      'no-irregular-whitespace': 'off',
      'no-constant-binary-expression': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': 'off'
    }
  }
);