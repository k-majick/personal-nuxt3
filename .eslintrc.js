module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    "vue/setup-compiler-macros": true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier", "risxss"],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "prefer-const": 2,
    "no-console": [
      "error",
      {
        allow: ["warn", "error"],
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": 2,
    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/script-setup-no-uses-vars": "off",
    "prettier/prettier": "off",
    curly: ["error"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "risxss/catch-potential-xss-vue": "error",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
