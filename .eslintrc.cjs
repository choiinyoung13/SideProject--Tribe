module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    // 기존 UI/레이아웃을 유지하기 위해 현재는 <img> 사용을 허용합니다.
    '@next/next/no-img-element': 'off',
  },
}
