module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        "next/core-web-vitals",
        'prettier'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import'],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: true,
            typescript: {
                project: '.',
            },
        },
    },
    rules: {
        'import/no-extraneous-dependencies': ['off'],
        'import/prefer-default-export': 0,
        'import/extensions':0,
        '@typescript-eslint/no-explicit-any':0
    },

};
