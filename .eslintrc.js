exports = {
  'env': {
    'browser': true,
    "node": true,
    'es6': true
},
'extends': ['eslint:recommended'],
'plugins': ['react'],
'parserOptions': {
    'ecmaVersion': 2018
},
'rules': {
  'prettier/prettier': [
    'error',
    {
        'printWidth': 80,
        'trailingComma': "es5",
        'semi': false,
        'jsxSingleQuote': true,
        'singleQuote': true,
        'useTabs': true
    }
]
}
}

