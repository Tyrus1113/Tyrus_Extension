// .eslintrc.js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true
    },
    extends: [
        // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
        'standard'
    ],
    globals: {
        NODE_ENV: false
    },
    rules: {
        indent: ["error", 4],
        'no-unused-vars': 0,
        'import/no-webpack-loader-syntax': 0,
        'no-redeclare': 0,
        // 添加，分号必须
        semi: ['error', 'never'],
        'no-unexpected-multiline': 'off',
        'space-before-function-paren': ['error', 'never'],
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true
            }
        ]
    }
}