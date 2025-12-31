'use client'

import { useEffect, useActionState, useCallback } from 'react'
import Swal from 'sweetalert2'

import { useNavigate } from '@/shared/routing/navigation'
import { supabase } from '@/supabase/supabaseClient'
import type { Provider } from '@supabase/supabase-js'

import { LoginForm } from './Login/LoginForm'
import { SocialLoginButtons } from './Login/SocialLoginButtons'
import Link from 'next/link'

import {
  loginWithPasswordAction,
  type LoginActionState,
} from '@/app/login/actions'

type Props = {
  redirectTo: string
}

export default function LoginPanelClient({ redirectTo }: Props) {
  const navigate = useNavigate()

  const [state, formAction, isPending] = useActionState<
    LoginActionState,
    FormData
  >(loginWithPasswordAction, { ok: true })

  const signInWithOAuth = async (provider: Provider) => {
    const redirectToOrigin =
      typeof window !== 'undefined' ? window.location.origin : undefined

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectToOrigin,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    })

    if (error) {
      console.error(`OAuth 로그인 중 오류 발생 (${provider}):`, error)
    }
  }

  const verifyOtpCode = useCallback(async (email: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      })

      if (error) {
        return { success: false as const, error }
      }

      return { success: true as const }
    } catch (error) {
      console.error('인증번호 확인 중 오류 발생:', error)
      return { success: false as const }
    }
  }, [])

  const openVerificationModal = useCallback(
    (email: string) => {
    Swal.fire({
      html: `
        <h1 style="font-weight:500; font-size:22px;">인증번호 입력</h1>
        <input type="text" id="otp-code" class="swal2-input" placeholder="6자리 인증번호 입력">
      `,
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소',
      allowOutsideClick: false,
      confirmButtonColor: '#1E1E1E',
      cancelButtonColor: '#1E1E1E',
      preConfirm: () => {
        const otpCode = (
          document.getElementById('otp-code') as HTMLInputElement
        ).value
        if (!otpCode || otpCode.length !== 6) {
          Swal.showValidationMessage('6자리 인증번호를 입력하세요.')
          return false
        }
        return otpCode
      },
    }).then(async result => {
      if (result.isConfirmed && result.value) {
        const res = await verifyOtpCode(email, result.value)

        if (res.success) {
          Swal.fire({
            text: '이메일 인증이 완료되었습니다!',
            icon: 'success',
            confirmButtonColor: '#1E1E1E',
            confirmButtonText: '확인',
          }).then(() => {
            navigate('/')
          })
        } else if (!res.success && res.error) {
          if (res.error.message === 'Token has expired or is invalid') {
            Swal.fire({
              text: '인증코드가 유효하지 않습니다.',
              icon: 'warning',
              confirmButtonColor: '#1E1E1E',
              confirmButtonText: '확인',
            }).then(result => {
              if (result.isConfirmed && result.value)
                openVerificationModal(email)
            })
          } else {
            Swal.fire({
              text: '인증과정 중 오류가 발생했습니다.',
              icon: 'warning',
              confirmButtonColor: '#1E1E1E',
              confirmButtonText: '확인',
            }).then(result => {
              if (result.isConfirmed && result.value)
                openVerificationModal(email)
            })
          }
        }
      }
    })
    },
    [verifyOtpCode, navigate]
  )

  useEffect(() => {
    if (!state || state.ok) return

    if (state.code === 'NO_ACCOUNT') {
      Swal.fire({
        text: state.error,
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    if (state.code === 'EMAIL_NOT_CONFIRMED' && state.email) {
      // 이메일 인증이 안 된 계정이면 바로 OTP 모달 표시
      // 먼저 OTP 재전송
      supabase.auth.signInWithOtp({
        email: state.email,
        options: {
          shouldCreateUser: false,
        },
      }).then(() => {
        // OTP 전송 후 바로 모달 표시
        openVerificationModal(state.email!)
      })
    }
  }, [state, openVerificationModal])

  const handleGoogleLogin = () => signInWithOAuth('google')
  const handleKakaoLogin = () => signInWithOAuth('kakao')

  return (
    <div className="w-full min-[1000px]:w-1/2 h-screen min-h-[900px] flex justify-center items-center max-[600px]:min-h-[700px]">
      <div className="flex flex-col justify-center items-start min-w-[460px] max-[600px]:items-center max-[600px]:min-w-full">
        <h2 className="mt-[30px] text-[1.8rem] font-bold max-[600px]:text-[1.3rem] max-[370px]:text-[1.1rem]">
          Tribe에 도착한 여러분 환영합니다.
        </h2>
        <p className="text-[1rem] text-[rgba(40,40,40,1)] my-[20px] mb-[50px] max-[600px]:text-[0.8rem] max-[600px]:mb-[38px]">
          우리 함께 당신의 공간을 아름답게 꾸며 볼까요?
        </p>

        <LoginForm
          action={formAction}
          errorMessage={!state.ok ? state.error : ''}
          isLoading={isPending}
          redirectTo={redirectTo}
        />

        <SocialLoginButtons
          onGoogleLogin={handleGoogleLogin}
          onKakaoLogin={handleKakaoLogin}
          isLoading={isPending}
        />

        <div className="w-full flex justify-center">
          <div className="mt-[20px] text-[0.9rem] font-[300] text-[rgba(120,120,120,1)] [&_span]:font-[500] [&_span]:text-[rgba(30,30,30,1)] [&_span]:ml-[8px]">
            아직 회원이 아니신가요?
            <span>
              <Link href={'/join'}> 회원가입</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}


