import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHandleSignUp } from '../../hooks/usehandleSignUp'
import { joinValidationHelpers } from '../../utill/joinValidationHelpers'
import { SWAL_CONFIG } from '../../constants/joinConstants'
import { VerificationModal } from './VerificationModal'

interface JoinFormLogicProps {
  formData: any
  updateFormData: (updates: any) => void
}

/**
 * Join 폼 비즈니스 로직 컴포넌트 - 로직과 UI 분리
 */
export const useJoinFormLogic = ({
  formData,
  updateFormData,
}: JoinFormLogicProps) => {
  const [isSignUpLoading, setIsSignUpLoading] = useState(false)
  const { handleSignUp, verifyOtpCode } = useHandleSignUp()
  const navigate = useNavigate()

  // 인증번호 입력 모달
  const openVerificationModal = (email: string) => {
    VerificationModal.open({
      onSuccess: async () => {
        const res = await verifyOtpCode(
          email,
          (document.getElementById('otp-code') as HTMLInputElement).value
        )

        if (res.success) {
          VerificationModal.showSuccess(() => navigate('/'))
        } else if (!res.success && res.error) {
          const errorMessage =
            res.error.message === 'Token has expired or is invalid'
              ? '인증코드가 유효하지 않습니다.'
              : '오류가 발생했습니다 다시 시도해주세요'

          VerificationModal.showError(errorMessage, () =>
            openVerificationModal(email)
          )
        }
      },
      onRetry: () => openVerificationModal(email),
      onCancel: () => updateFormData({ isInputsDisabled: true }),
    })
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 폼 검증
    const validation = joinValidationHelpers.validateJoinForm(formData)
    if (!validation.isValid) {
      Swal.fire({
        text: validation.error,
        icon: 'warning',
        confirmButtonColor: SWAL_CONFIG.CONFIRM_BUTTON_COLOR,
        confirmButtonText: SWAL_CONFIG.CONFIRM_TEXT,
        scrollbarPadding: SWAL_CONFIG.SCROLLBAR_PADDING,
      })
      return
    }

    // 회원가입 처리
    setIsSignUpLoading(true)
    const result = await handleSignUp(formData.email, formData.password)

    if (!result.success) {
      const errorMessage =
        result.error?.message === 'email rate limit exceeded'
          ? '인증 이메일 발신 횟수 제한을 초과했습니다.'
          : '계정등록 오류가 발생했습니다.'

      Swal.fire({
        text: errorMessage,
        icon: 'warning',
        confirmButtonColor: SWAL_CONFIG.CONFIRM_BUTTON_COLOR,
        confirmButtonText: SWAL_CONFIG.CONFIRM_TEXT,
        scrollbarPadding: SWAL_CONFIG.SCROLLBAR_PADDING,
      })
      setIsSignUpLoading(false)
      return
    }

    // 성공 처리
    Swal.fire({
      html: '<strong>계정 등록이 성공했습니다!</strong><br>이메일을 확인하여 인증을 완료해 주세요.',
      icon: 'success',
      confirmButtonColor: SWAL_CONFIG.CONFIRM_BUTTON_COLOR,
      confirmButtonText: SWAL_CONFIG.CONFIRM_TEXT,
      scrollbarPadding: SWAL_CONFIG.SCROLLBAR_PADDING,
    }).then(() => {
      openVerificationModal(formData.email)
    })
    setIsSignUpLoading(false)
  }

  return {
    isSignUpLoading,
    handleSubmit,
    openVerificationModal,
  }
}
