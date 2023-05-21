module.exports = {
  root: true,
  "env": {
    "browser": true,
  },
  parserOptions: {
    'project': 'tsconfig.json',
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/unbound-method": [
        "error",
        {
            "ignoreStatic": true,
        },
    ],
    "@typescript-eslint/semi": "error",
    "@typescript-eslint/no-extraneous-class": "off",

    'max-lines-per-function': ['error', 35],
    'max-classes-per-file': ['error', 1],
    'max-params': ['error', 3],
    'max-depth': ['error', 2],

    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'no-unused-expressions': 'error',
    'no-negated-condition': 'error',
    'no-mixed-operators': 'error',
    'no-nested-ternary': 'error',
    'no-useless-return': 'error',
    'no-param-reassign': 'error',
    'no-return-assign': 'error',
    'no-multi-assign': 'error',
    'no-return-await': 'error',
    'no-undefined': 'error',
    'no-sequences': 'error',
    'no-lonely-if': 'error',
    'no-multi-str': 'error',
    'no-shadow': 'error',
    'no-var': 'error',

    'prefer-promise-reject-errors': 'error',
    'prefer-named-capture-group': 'error',
    'prefer-destructuring': 'error',
    'prefer-object-spread': 'error',
    'prefer-template': 'error',
    'prefer-const': 'error',

    'quotes': ['error', 'single'],
    'require-await': 'error',
    'dot-notation': 'error',
    'vars-on-top': 'error',
    'camelcase': 'error',
    'eqeqeq': 'error',
    'yoda': 'error',

    'array-bracket-spacing': ['error', 'always', { 'singleValue': false, 'objectsInArrays': false }],
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 2 }],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'space-before-function-paren': ['error', 'never'],
    'key-spacing': ['error', { 'afterColon': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    'no-whitespace-before-property': 'error',
    'func-call-spacing': ['error', 'never'],
    'max-len': ['error', { 'code': 120 }],
    'space-before-blocks': 'error',
    'no-multi-spaces': 'error',
    'comma-spacing': 'error',
    'arrow-spacing': 'error',
    'block-spacing': 'error',
    'arrow-parens': 'error',
    'new-parens': 'error',
    'semi': 'off',
    'keyword-spacing': [
      'error',
      {
        'overrides':
          {
            'if': { 'after': true },
            'for': { 'after': false },
            'while': { 'after': false },
            'static': { 'after': false },
            'as': { 'after': false }
          }
      }
    ],
  }
};
