import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import tsParser from "@typescript-eslint/parser"
import unusedImports from "eslint-plugin-unused-imports"
import airbnbBase from "eslint-config-airbnb-base";
import airbnbBaseTypescript from "eslint-config-airbnb-base-typescript";

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...airbnbBase.rules,
      ...airbnbBaseTypescript.rules,
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          var: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrorIgnorePattern: "^_" 
        }
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ]
    },
    settings : {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    }
  },
])
