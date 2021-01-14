module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
    // 'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'standard-with-typescript'
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    project: './tsconfig.json',
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'eslint-disable-next-line @typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
    "@typescript-eslint/naming-convention": [
      "error",
      { "selector": "variableLike", "format": ["camelCase"], "leadingUnderscore": "allow" },
      {
        "selector": "variable",
        "modifiers": ["const"],
        "format": ["UPPER_CASE", "camelCase"]
      }
    ]
    // 'space-before-function-paren': [
    //   2,
    //   {
    //     "anonymous": "always",
    //     "named": "never",
    //     "asyncArrow": "always"
    //   }
    // ]
  }
};
