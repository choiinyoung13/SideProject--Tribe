import { VALIDATION_CONSTANTS } from '../constants/layoutConstants'

// 표준화된 검증 결과 타입
export type ValidationResult =
  | { isValid: true }
  | { isValid: false; error: string }

/**
 * 이메일 유효성 검사
 */
export const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim()

  if (trimmedEmail.length < VALIDATION_CONSTANTS.EMAIL.MIN_LENGTH) {
    return { isValid: false, error: '이메일을 입력해주세요.' }
  }

  if (trimmedEmail.length > VALIDATION_CONSTANTS.EMAIL.MAX_LENGTH) {
    return { isValid: false, error: '이메일은 50자를 초과할 수 없습니다.' }
  }

  if (!VALIDATION_CONSTANTS.EMAIL.REGEX.test(trimmedEmail)) {
    return { isValid: false, error: '올바른 이메일 형식이 아닙니다.' }
  }

  return { isValid: true }
}

/**
 * 비밀번호 유효성 검사
 */
export const validatePassword = (password: string): ValidationResult => {
  if (password.length < VALIDATION_CONSTANTS.PASSWORD.MIN_LENGTH) {
    return { isValid: false, error: '비밀번호는 6자 이상이어야 합니다.' }
  }

  if (password.length > VALIDATION_CONSTANTS.PASSWORD.MAX_LENGTH) {
    return { isValid: false, error: '비밀번호는 20자를 초과할 수 없습니다.' }
  }

  if (!VALIDATION_CONSTANTS.PASSWORD.REGEX.test(password)) {
    return {
      isValid: false,
      error: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
    }
  }

  return { isValid: true }
}

/**
 * 닉네임 유효성 검사
 */
export const validateNickname = (nickname: string): ValidationResult => {
  const trimmedNickname = nickname.trim()

  if (trimmedNickname.length < VALIDATION_CONSTANTS.NICKNAME.MIN_LENGTH) {
    return { isValid: false, error: '닉네임을 입력해주세요.' }
  }

  if (trimmedNickname.length > VALIDATION_CONSTANTS.NICKNAME.MAX_LENGTH) {
    return { isValid: false, error: '닉네임은 20자를 초과할 수 없습니다.' }
  }

  if (!VALIDATION_CONSTANTS.NICKNAME.REGEX.test(trimmedNickname)) {
    return {
      isValid: false,
      error: '닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.',
    }
  }

  return { isValid: true }
}

/**
 * 폼 전체 유효성 검사
 */
export const validateLoginForm = (
  email: string,
  password: string
): ValidationResult => {
  const emailValidation = validateEmail(email)
  if (!emailValidation.isValid) {
    return emailValidation
  }

  const passwordValidation = validatePassword(password)
  if (!passwordValidation.isValid) {
    return passwordValidation
  }

  return { isValid: true }
}
