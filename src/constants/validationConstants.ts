// Validation 관련 상수들을 한 곳에 모아서 관리
export const VALIDATION_CONSTANTS = {
  EMAIL: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
    REGEX:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 20,
    REGEX:
      /^(?=.*[a-zA-Z])(?=.*[\d\W_])([a-zA-Z\d\W_])(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣])[a-zA-Z\d\W_]{6,20}$/,
  },
  NICKNAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 20,
    REGEX: /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+$/,
  },
} as const
