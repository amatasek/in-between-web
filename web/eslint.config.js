import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      react,
      'react-hooks': reactHooks
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
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      "react/button-has-type": "error",
      "react/jsx-key": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/no-array-index-key": "error",
      "react/no-children-prop": "error",
      "react/no-danger-with-children": "error",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-unescaped-entities": "error",
      "react/no-unknown-property": "error",
      "react/no-unstable-nested-components": "error",
      "react/require-render-return": "error",
      "react/self-closing-comp": "error",
      "react/void-dom-elements-no-children": "error",
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
