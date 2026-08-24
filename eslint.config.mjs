import eslint from "@eslint/js";
import next from "eslint-config-next";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "coverage/**",
      "public/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...next,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
);
