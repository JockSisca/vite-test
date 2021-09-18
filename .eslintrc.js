module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["vue", "html", "jsx", "prettier"],
  extends: ["plugin:vue/vue3-recommended", "plugin:prettier/recommended"], //查找语法错误
  rules: {
    "prettier/prettier": "error", //统一风格
    "eol-last": "always", // 允许数组换行
  },
};
