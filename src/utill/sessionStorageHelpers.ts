import { JOIN_CONSTANTS } from '../constants/joinConstants'

// 세션 스토리지 관련 헬퍼 함수들
export const sessionStorageHelpers = {
  // 세션에서 데이터 복원
  restoreFromSession: () => {
    return {
      email: sessionStorage.getItem(JOIN_CONSTANTS.SESSION_KEYS.EMAIL) || '',
      isEmailValid: JSON.parse(
        sessionStorage.getItem(JOIN_CONSTANTS.SESSION_KEYS.IS_EMAIL_VALID) ||
          'false'
      ),
      password:
        sessionStorage.getItem(JOIN_CONSTANTS.SESSION_KEYS.PASSWORD) || '',
      confirmPassword:
        sessionStorage.getItem(JOIN_CONSTANTS.SESSION_KEYS.CONFIRM_PASSWORD) ||
        '',
      isPasswordValid: JSON.parse(
        sessionStorage.getItem(JOIN_CONSTANTS.SESSION_KEYS.IS_PASSWORD_VALID) ||
          'false'
      ),
      isConfirmPasswordValid: JSON.parse(
        sessionStorage.getItem(
          JOIN_CONSTANTS.SESSION_KEYS.IS_CONFIRM_PASSWORD_VALID
        ) || 'false'
      ),
      isEmailExists: JSON.parse(
        sessionStorage.getItem(JOIN_CONSTANTS.SESSION_KEYS.IS_EMAIL_EXISTS) ||
          'null'
      ),
      isRequiredChecked: JSON.parse(
        sessionStorage.getItem(
          JOIN_CONSTANTS.SESSION_KEYS.IS_REQUIRED_CHECKED
        ) || 'false'
      ),
      isInputsDisabled: JSON.parse(
        sessionStorage.getItem(
          JOIN_CONSTANTS.SESSION_KEYS.IS_INPUTS_DISABLED
        ) || 'false'
      ),
    }
  },

  // 세션에 데이터 저장
  saveToSession: (data: {
    email: string
    isEmailValid: boolean
    password: string
    confirmPassword: string
    isPasswordValid: boolean
    isConfirmPasswordValid: boolean
    isEmailExists: boolean | null
    isRequiredChecked: boolean
    isInputsDisabled: boolean
  }) => {
    sessionStorage.setItem(JOIN_CONSTANTS.SESSION_KEYS.EMAIL, data.email)
    sessionStorage.setItem(
      JOIN_CONSTANTS.SESSION_KEYS.IS_EMAIL_VALID,
      JSON.stringify(data.isEmailValid)
    )
    sessionStorage.setItem(JOIN_CONSTANTS.SESSION_KEYS.PASSWORD, data.password)
    sessionStorage.setItem(
      JOIN_CONSTANTS.SESSION_KEYS.CONFIRM_PASSWORD,
      data.confirmPassword
    )
    sessionStorage.setItem(
      JOIN_CONSTANTS.SESSION_KEYS.IS_PASSWORD_VALID,
      JSON.stringify(data.isPasswordValid)
    )
    sessionStorage.setItem(
      JOIN_CONSTANTS.SESSION_KEYS.IS_CONFIRM_PASSWORD_VALID,
      JSON.stringify(data.isConfirmPasswordValid)
    )
    sessionStorage.setItem(
      JOIN_CONSTANTS.SESSION_KEYS.IS_EMAIL_EXISTS,
      JSON.stringify(data.isEmailExists)
    )
    sessionStorage.setItem(
      JOIN_CONSTANTS.SESSION_KEYS.IS_REQUIRED_CHECKED,
      JSON.stringify(data.isRequiredChecked)
    )
    sessionStorage.setItem(
      JOIN_CONSTANTS.SESSION_KEYS.IS_INPUTS_DISABLED,
      JSON.stringify(data.isInputsDisabled)
    )
  },

  // 세션 클리어
  clearSession: () => {
    sessionStorage.clear()
  },
}
