// Join 페이지 관련 상수들
export const JOIN_CONSTANTS = {
  BREAKPOINTS: {
    DESKTOP: 1720,
    MOBILE: 600,
  },
  LAYOUT: {
    FORM_WIDTH_DESKTOP: '50%',
    FORM_WIDTH_MOBILE: '100%',
    IMAGE_WIDTH: '50%',
  },
  VALIDATION: {
    OTP_LENGTH: 6,
  },
  SESSION_KEYS: {
    EMAIL: 'email',
    IS_EMAIL_VALID: 'isEmailValid',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
    IS_PASSWORD_VALID: 'isPasswordValid',
    IS_CONFIRM_PASSWORD_VALID: 'isConfirmPasswordValid',
    IS_EMAIL_EXISTS: 'isEmailExists',
    IS_REQUIRED_CHECKED: 'isRequiredChecked',
    IS_INPUTS_DISABLED: 'isInputsDisabled',
  },
} as const

export const SWAL_CONFIG = {
  CONFIRM_BUTTON_COLOR: '#1E1E1E',
  CANCEL_BUTTON_COLOR: '#1E1E1E',
  CONFIRM_TEXT: '확인',
  CANCEL_TEXT: '취소',
  SCROLLBAR_PADDING: false,
} as const
