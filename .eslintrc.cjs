const path = require('path')

/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
    extends: ['next', 'next/core-web-vitals', 'eslint:recommended', 'plugin:import/recommended', 'plugin:tailwindcss/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    globals: {
        React: 'readonly',
        JSX: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
    },
    plugins: ['import', 'tailwindcss', '@typescript-eslint'],
    settings: {
        tailwindcss: {
            callees: ['cn'],
            config: 'tailwind.config.ts',
        },
    },
    rules: {
        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type', 'unknown'],
            },
        ],
        'no-case-declarations': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@next/next/no-img-element': 'off',
        'tailwindcss/no-custom-classname': 'off',
        'tailwindcss/classnames-order': 'error',
        // TODO: Remove @typescript-eslint/no-explicit-any
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                prefer: 'type-imports',
                fixStyle: 'inline-type-imports',
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'none',
                argsIgnorePattern: '^(_|page)',
                varsIgnorePattern: '^(_|page)',
            },
        ],
    },
}

module.exports = eslintConfig
