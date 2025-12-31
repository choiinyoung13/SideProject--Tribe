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
    // (next/image로의 전환은 이미지 사이즈/레이아웃 변화 리스크가 있어 별도 작업으로 진행 권장)
    '@next/next/no-img-element': 'off',
  },
}
