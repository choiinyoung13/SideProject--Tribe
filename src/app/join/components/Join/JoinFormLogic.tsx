'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { supabase } from '@/supabase/supabaseClient'
import { VerificationModal } from './VerificationModal'
import type { JoinFormData } from '@/features/auth/join/types'

interface UseJoinFormLogicProps {
  formData: JoinFormData
  updateFormData: (updates: Partial<JoinFormData>) => void
}

export const useJoinFormLogic = ({
  formData,
  updateFormData,
}: UseJoinFormLogicProps) => {
  const [isSignUpLoading, setIsSignUpLoading] = useState(false)
  const router = useRouter()

  const openVerificationModal = (email: string) => {
    // signUp이 이미 이메일을 보냈으므로, 바로 OTP 모달 표시
    // Supabase가 보낸 이메일의 OTP를 사용
    VerificationModal.open({
      onSuccess: async (otpCode: string) => {
        // OTP 인증 완료 처리
        setIsSignUpLoading(true)
        
        try {
          // OTP 검증 (signUp으로 보낸 이메일의 OTP는 'signup' 타입 사용)
          const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
            email: email,
            token: otpCode,
            type: 'signup',
          })

          if (verifyError) {
            VerificationModal.showError(
              verifyError.message || '인증번호가 올바르지 않습니다.',
              () => {
                openVerificationModal(email)
              }
            )
            setIsSignUpLoading(false)
            return
          }

          // OTP 검증 성공 시 이메일 인증 완료
          if (verifyData.user) {
            // 등록 완료 모달 표시
            VerificationModal.showSuccess(() => {
              router.push('/')
            })
          }
        } catch (error) {
          Swal.fire({
            text: '인증 중 오류가 발생했습니다.',
            icon: 'error',
            confirmButtonColor: '#1E1E1E',
            confirmButtonText: '확인',
            scrollbarPadding: false,
          })
          setIsSignUpLoading(false)
        }
      },
      onCancel: () => {
        // OTP 모달 취소 시 "OTP 인증하기" 버튼 유지 (isInputsDisabled: true 유지)
        // 입력 필드는 비활성화 상태 유지
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 유효성 검사
    if (
      !formData.isEmailValid ||
      !formData.isPasswordValid ||
      !formData.isConfirmPasswordValid ||
      !formData.isRequiredChecked
    ) {
      Swal.fire({
        text: '모든 항목을 올바르게 입력해주세요.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        text: '비밀번호가 일치하지 않습니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    if (formData.isEmailExists === true) {
      // 이미 가입된 이메일인 경우, 이메일 인증이 안 된 계정인지 확인
      try {
        const response = await fetch('/api/admin/check-user-verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        })

        const data = await response.json()

        // 이메일 인증이 안 된 계정이면 OTP 모달 표시
        if (data.exists && !data.isVerified) {
          Swal.fire({
            text: '이미 가입된 이메일입니다. 이메일 인증을 완료해주세요.',
            icon: 'warning',
            confirmButtonColor: '#1E1E1E',
            confirmButtonText: '확인',
            scrollbarPadding: false,
          }).then(() => {
            // OTP 재전송 후 모달 표시
            supabase.auth.signInWithOtp({
              email: formData.email,
              options: {
                shouldCreateUser: false,
              },
            }).then(() => {
              openVerificationModal(formData.email)
            })
          })
          return
        }
      } catch (error) {
        // API 호출 실패 시 일반 메시지 표시
        console.error('Error checking user verification status:', error)
      }
      
      Swal.fire({
        text: '이미 가입된 이메일입니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    if (formData.isEmailExists === null) {
      Swal.fire({
        text: '이메일 중복확인을 해주세요.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    setIsSignUpLoading(true)

    try {
      // 1. 계정 생성 (이메일 인증 안 된 상태)
      // emailRedirectTo를 제거하면 자동 이메일 전송을 막을 수 있음
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (signUpError) {
        Swal.fire({
          text: signUpError.message || '회원가입에 실패했습니다.',
          icon: 'error',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
        setIsSignUpLoading(false)
        return
      }

      // 입력 필드 비활성화
      updateFormData({ isInputsDisabled: true })
      setIsSignUpLoading(false)

      // 2. 가입 성공 모달 표시
      Swal.fire({
        text: '가입 성공했습니다. 이메일 인증을 완료해주세요.',
        icon: 'success',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      }).then(() => {
        // 3. 확인 버튼 클릭 시 OTP 전송 후 모달 표시
        // OTP는 모달이 열릴 때 전송 (rate limit 방지)
        openVerificationModal(formData.email)
      })
    } catch (error) {
      Swal.fire({
        text: '회원가입 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      setIsSignUpLoading(false)
    }
  }

  return {
    isSignUpLoading,
    handleSubmit,
    openVerificationModal,
  }
}

