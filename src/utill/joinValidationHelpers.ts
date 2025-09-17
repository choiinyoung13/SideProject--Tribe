import { ValidationResult } from './validationHelpers'
import { JOIN_CONSTANTS } from '../constants/joinConstants'

// Join 폼 검증 관련 헬퍼 함수들
export const joinValidationHelpers = {
  // 이메일 필수 입력 검증
  validateEmailRequired: (email: string): ValidationResult => {
    if (!email.trim()) {
      return { isValid: false, error: '사용하실 이메일을 입력해주세요.' }
    }
    return { isValid: true }
  },

  // 이메일 형식 검증
  validateEmailFormat: (isEmailValid: boolean): ValidationResult => {
    if (!isEmailValid) {
      return { isValid: false, error: '올바른 이메일 형식으로 입력해주세요.' }
    }
    return { isValid: true }
  },

  // 이메일 중복 확인 검증
  validateEmailDuplicate: (isEmailExists: boolean | null): ValidationResult => {
    if (isEmailExists === null) {
      return { isValid: false, error: '중복확인을 진행해 주세요.' }
    }
    if (isEmailExists) {
      return { isValid: false, error: '이미 가입한 이메일 계정입니다.' }
    }
    return { isValid: true }
  },

  // 비밀번호 필수 입력 검증
  validatePasswordRequired: (password: string): ValidationResult => {
    if (!password.trim()) {
      return { isValid: false, error: '사용하실 비밀번호를 입력해주세요.' }
    }
    return { isValid: true }
  },

  // 비밀번호 형식 검증
  validatePasswordFormat: (isPasswordValid: boolean): ValidationResult => {
    if (!isPasswordValid) {
      return { isValid: false, error: '올바른 비밀번호 형식으로 입력해주세요.' }
    }
    return { isValid: true }
  },

  // 비밀번호 확인 필수 입력 검증
  validateConfirmPasswordRequired: (
    confirmPassword: string
  ): ValidationResult => {
    if (!confirmPassword.trim()) {
      return { isValid: false, error: '비밀번호 확인란을 입력해주세요.' }
    }
    return { isValid: true }
  },

  // 비밀번호 일치 검증
  validatePasswordMatch: (
    isConfirmPasswordValid: boolean
  ): ValidationResult => {
    if (!isConfirmPasswordValid) {
      return {
        isValid: false,
        error: '비밀번호가 일치하지 않습니다. 확인해 주세요.',
      }
    }
    return { isValid: true }
  },

  // 약관 동의 검증
  validateTermsAgreement: (isRequiredChecked: boolean): ValidationResult => {
    if (!isRequiredChecked) {
      return { isValid: false, error: '필수 약관에 동의해 주세요.' }
    }
    return { isValid: true }
  },

  // 전체 폼 검증
  validateJoinForm: (formData: {
    email: string
    isEmailValid: boolean
    isEmailExists: boolean | null
    password: string
    isPasswordValid: boolean
    confirmPassword: string
    isConfirmPasswordValid: boolean
    isRequiredChecked: boolean
  }): ValidationResult => {
    const validations = [
      joinValidationHelpers.validateEmailRequired(formData.email),
      joinValidationHelpers.validateEmailFormat(formData.isEmailValid),
      joinValidationHelpers.validateEmailDuplicate(formData.isEmailExists),
      joinValidationHelpers.validatePasswordRequired(formData.password),
      joinValidationHelpers.validatePasswordFormat(formData.isPasswordValid),
      joinValidationHelpers.validateConfirmPasswordRequired(
        formData.confirmPassword
      ),
      joinValidationHelpers.validatePasswordMatch(
        formData.isConfirmPasswordValid
      ),
      joinValidationHelpers.validateTermsAgreement(formData.isRequiredChecked),
    ]

    const firstError = validations.find(validation => !validation.isValid)
    return firstError || { isValid: true }
  },
}
