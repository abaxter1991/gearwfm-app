/** @type {import('prettier').Config} */
const prettierConfig = {
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    trailingComma: 'es5',
    tabWidth: 4,
    singleQuote: true,
    semi: false,
    printWidth: 200,
    arrowParens: 'always',
    singleAttributePerLine: true,
}

module.exports = prettierConfig
