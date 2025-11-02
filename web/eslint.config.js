import globals from 'globals';
import react from 'eslint-plugin-react';

export default [
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      react
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "array-callback-return": "error",
      "curly": ["error", "multi-line"],
      "default-case": "error",
      "dot-notation": "error",
      "eqeqeq": "error",
      "no-alert": "error",
      "no-await-in-loop": "error",
      "no-debugger": "error",
      "no-else-return": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-lonely-if": "error",
      "no-promise-executor-return": "error",
      "no-return-await": "error",
      "no-throw-literal": "error",
      "no-unneeded-ternary": "error",
      "no-unreachable": "error",
      "no-unreachable-loop": "error",
      "no-unused-vars": "error",
      "no-useless-catch": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-object-spread": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "require-await": "error",
      "yoda": "error"
    }
  }
];
