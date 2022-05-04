module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 11,
  },
  rules: {
    "no-console": 0,
    "no-underscore-dangle": 0,
    "linebreak-style": 0,
    indent: 0,
    quotes: 0,
    "no-unused-vars": 0,
    "no-param-reassign": 0,
  },
};
