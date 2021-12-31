/*eslint-env node*/
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'import'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
            typescript: {
                config: 'tsconfig.json',
                alwaysTryTypes: false,
            },
        },
        react: {
            version: 'detect',
        },
    },
    rules: {
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    '{}': false,
                },
            },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/prop-types': ['off'],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [
            'error',
            { extensions: ['.jsx', '.tsx'] },
        ],
        'import/order': ['error'],
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'all',
                endOfLine: 'lf',
                semi: false,
                singleQuote: true,
                printWidth: 80,
                tabWidth: 4,
            },
        ],
    },
}
