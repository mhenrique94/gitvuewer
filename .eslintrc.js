module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "vue/multi-word-component-names": "off",
    "no-debugger": "off",
  },
};
