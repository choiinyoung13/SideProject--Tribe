// Layout 관련 상수들을 한 곳에 모아서 관리
export const LAYOUT_CONSTANTS = {
  WIDTH: {
    FULL: '100%',
    MIN: '100%',
  },
  OVERFLOW: {
    HORIZONTAL_SCROLL_PREVENTION: 'hidden',
    AUTO: 'auto',
  },
  BREAKPOINTS: {
    MOBILE: 600,
    TABLET: 768,
    DESKTOP: 1000,
    LARGE_DESKTOP: 1920,
    FOOTER_BREAKPOINT: 1024,
  },
} as const

export const FOOTER_CONSTANTS = {
  NO_FOOTER_PATHS: [
    '/',
    '/about',
    '/community-feature',
    '/community',
    '/login',
    '/join',
    '/fakeSignup',
  ],
  COMPANY_INFO: {
    NAME: '주식회사 트리비',
    REPRESENTATIVE: 'ooo',
    BUSINESS_NUMBER: '123-45-67891',
    ADDRESS: '서울특별시 서초구 명달로 9 방배빌딩',
    REPORT_NUMBER: '1234-5678',
  },
  CUSTOMER_SERVICE: {
    PHONE: '1234-1234',
    HOURS: 'AM 10:00 - PM: 18:00 점심시간 13:00 - 14:00 (주말 & 공휴일 휴무)',
  },
} as const

export const ANIMATION_CONSTANTS = {
  DELAY_MS: 300,
  DURATION_MS: 500,
  TRANSITION_EASE: 'ease',
} as const
